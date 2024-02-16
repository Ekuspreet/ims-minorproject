from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class Item:
    
    def add_item(self):
        
        # create item. here by item we mean raw material
        item = {
            "_id": uuid.uuid4().hex,
            "name": request.json["name"],
            "quantity": float(request.json["quantity"])
        } 

        if db.items.find_one( {"name": item["name"]}):
            return jsonify({"error": "Item already present"})
        
        else:
            if db.items.insert_one(item):
                return jsonify({"meassage": "item added successfully"})
            
        return jsonify( { "error": " failed to add item" } ), 400
    
    def remove_item(self):
        pass