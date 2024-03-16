from flask import request, jsonify
from app import db
from cryptography.fernet import Fernet
import os

key = Fernet.generate_key()
cipher_suite = Fernet(key)

class Product():
    
    def add_product(self, business_id):
        
        product = request.json
        product["product_id"] = self.get_product_id(business_id)
        if product["product_id"] == None:
            return jsonify({"Error": "Invalid business Id"})
        
        items = product["items"]
        del product["items"]

        encrypted_items = {}

        for name, value in items.items():
            encrypted_name = cipher_suite.encrypt(name.encode())
            encrypted_items[encrypted_name] = value

        product["items"] = encrypted_items

        if  db.businesses.update_one({"_id": business_id}, {"$push" :{"products": product}}):
            return jsonify({"success": True, "Message": "Product added successfully."})
        
        return jsonify({"success": False, "Message": "Product could not be added"})


    def get_product_id(self, business_id):
        business = db.businesses.find_one({"_id": business_id})
        if business:
            PROD_NO = business["product_no"] + 1
            db.businesses.update_one({"_id": business_id}, {"$set": {"product_no":PROD_NO}})
            return ("PROD0" + str(PROD_NO))

        else:
            return None