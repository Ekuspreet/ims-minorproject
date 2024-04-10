from flask import request, jsonify, session
from app import db
import os

class Product():
    
    def add_product(self):
        
        business_id = session.get("business_id")
        name = request.json("name")
        batch_size = request.json("batch_size")

        product = {
            "name": name,
            "batch_size": batch_size,
            "items": []
        }
        product["product_id"] = self.get_product_id(business_id)
        if product["product_id"] == None:
            return jsonify({"Error": "Invalid business Id"})

        if  db.businesses.update_one({"_id": business_id}, {"$push" :{"products": product}}):
            return jsonify({"success": True, "Message": "Product added successfully."})
        
        return jsonify({"success": False, "Message": "Product could not be added"})

    def product_item():
        business_id = session.get("business_id")
        if not business_id:
            return jsonify({"success": False, "error": "Business ID not found in session."}), 400
        
        product_id = request.json.get("product_id")
        item_id = request.json.get("item_id")
        quantity = float(request.json.get("quantity", 0))
        
        if not (product_id and item_id):
            return jsonify({"success": False, "error": "Product ID or Item ID missing in request."}), 400
        
        item = {
            "item_id": item_id,
            "quantity": quantity
        }
        
        result = db.businesses.update_one(
            {"_id": business_id, "products.product_id": product_id},
            {"$push": {"products.$.items": item}}
        )
        
        if result.modified_count == 1:
            return jsonify({"success": True, "message": "Item added successfully."})
        else:
            return jsonify({"success": False, "error": "Failed to add item to product."}), 500


    def get_product_id(self, business_id):
        business = db.businesses.find_one({"_id": business_id})
        if business:
            PROD_NO = business["product_no"] + 1
            db.businesses.update_one({"_id": business_id}, {"$set": {"product_no":PROD_NO}})
            return ("PROD0" + str(PROD_NO))

        else:
            return None