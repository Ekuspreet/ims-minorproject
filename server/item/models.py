from flask import jsonify, request, session
from app import db

class Item:
    
    def add_item(self):
        business_id = session.get("business_id")
        item_name = request.json["name"]
        current_stock = float(request.json["current_stock"])
        threshold_stock = int(request.json["threshold_stock"])

        item_id = self.get_item_id(business_id)

        if db.businesses.count_documents({"business_id" : business_id, "items": {"$elemMatch": {"item_id": item_id}}}):
            return jsonify({"error": "Item already present"}), 201

        else:
            
            item = {
                "item_id": item_id,
                "name": item_name.title(),
                "current_stock": current_stock,
                "threshold_stock": threshold_stock
            } 
            
            if db.businesses.update_one({"_id":business_id}, {"$push" : {"items": item}}):
                return jsonify({"meassage": "item added successfully"}), 200
            
        return jsonify( { "error": " failed to add item" } ), 400
    
    def fetch_items(self):

        items_list = []
        business_id = session.get("business_id")
        business = db.businesses.find_one({"_id": business_id})

        if business:
            items_list = business.get("items", [])
            return jsonify({"success": True,"items_list": items_list})
        else:
            return jsonify({"success": False, "error": "Could not fetch items"})
        
    def update_item(self):
        business_id = session.get("business_id")
        item_id = request.json["item_id"]
        stock = request.json["stock"]
        
        business = db.businesses.find_one({"_id": business_id})
        
        if business:
            for item in business["items"]:
                if item["item_id"] == item_id:
                    old_stock = item.get("current_stock", 0)
                    break
            else:
                return jsonify({"error": "Item not found in business"})
            
            new_stock = stock + old_stock

            result = db.businesses.update_one(
                {"_id": business_id, "items.item_id": item_id},
                {"$set": {"items.$.current_stock": new_stock}}
            )

            if result.modified_count == 1:
                return jsonify({"success": "Stock has been updated"})
            else:
                return jsonify({"error": "Could not update stock"})
        
        else:
            return jsonify({"error": "Business not found"})
        
    def delete_item(self):
        business_id = session.get("business_id")
        item_id = request.json["item_id"]
        if db.businesses.count_documents({"_id": business_id, "items.item_id": item_id}):
            result = db.businesses.update_one(
                {"_id": business_id},
                {"$pull": {"items": {"item_id": item_id}}}
            )
            
            if result.modified_count == 1:
                return jsonify({"success": "Item has been removed"})
            
            else:
                return jsonify({"error": "Could not remove item"})
        
        else:
            return jsonify({"error": "Item not found"})
            

    def get_item_id(self, business_id):
        business = db.businesses.find_one({"_id": business_id})
        ITEM_NO = business["item_no"] + 1
        db.businesses.update_one({"_id": business_id}, {"$set": {"item_no": ITEM_NO}})
        return ("ITEM0" + str(ITEM_NO))