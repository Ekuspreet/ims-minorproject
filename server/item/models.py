from flask import jsonify, request, session
from app import db
import secrets

class Item:
    
    def add_item(self):
        
        item_name = request.json["item_name"]
        quantity = float(request.json["quantity"])
        business_id = request.json["business_id"]
        item_id = secrets.token_hex(6)

        if db.businesses.count_documents({"business_id" : business_id, "items.item_name": item_name}):
            return jsonify({"error": "Item already present"})
        
        else:
            
            # create item. here by item we mean raw material
            item = {
                "item_id": item_id,
                "name": item_name,
                "quantity": quantity
            } 
            
            if db.businesses.update_one({"business_id":business_id}, {"$push" : {"items": item}}):
                return jsonify({"meassage": "item added successfully"})
            
        return jsonify( { "error": " failed to add item" } ), 400
    
    def remove_item(self):
        pass