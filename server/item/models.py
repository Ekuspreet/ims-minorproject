from flask import jsonify, request, session, json
from app import db
from passlib.hash import pbkdf2_sha256

class Item:
    
    def add_item(self):
        
        item_name = request.json["item_name"]
        quantity = float(request.json["quantity"])
        business_id = request.json["business_id"]

        item_id = self.get_item_id(business_id)

        if db.businesses.count_documents({"business_id" : business_id, "items": {"$elemMatch": {"item_id": item_id}}}):
            return jsonify({"error": "Item already present"})

        else:
            
            # create item. here by item we mean raw material
            item = {
                "item_id": item_id,
                "name": item_name.title(),
                "quantity": quantity
            } 
            
            if db.businesses.update_one({"business_id":business_id}, {"$push" : {"items": item}}):
                return jsonify({"meassage": "item added successfully"})
            
        return jsonify( { "error": " failed to add item" } ), 400
    
    def fetch_items(self):

        items_list = []
        business_id = session["business_id"]

        business = db.businesses.find_one({"business_id": business_id})

        # Retrieve the items_list from the business document
        if business:
            items_list = business.get("items", [])
            return jsonify({"success": True,"items_list": items_list})
        else:
            return jsonify({"success": False, "error": "Could not fetch items"})
        
    def delete_item(self, item_id):

        business_id = session.get("business_id")
        if db.businesses.count_documents({"business_id": business_id, "items.item_id": item_id}):

            if db.businesses.delete_one({"business_id": business_id, "items.item_id": item_id}):
                return jsonify({"success": "Item has been deleted"})
            
            else:
                return jsonify({"error": "Could not delete item"})
            

    def get_item_id(self, business_id):
        business = db.businesses.find_one({"_id": business_id})
        ITEM_NO = business["item_no"] + 1
        db.businesses.update_one({"_id": business_id}, {"$set": {"item_no": ITEM_NO}})
        return ("ITEM0" + str(ITEM_NO))