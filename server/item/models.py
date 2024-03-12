from flask import jsonify, request, session
from app import db
from passlib.hash import pbkdf2_sha256

class Item:
    
    def add_item(self):
        
        item_name = request.json["item_name"]
        quantity = float(request.json["quantity"])
        business_id = request.json["business_id"]
        item_id = pbkdf2_sha256.encrypt(item_name)

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