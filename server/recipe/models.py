from flask import session, jsonify
from app import db

class Recipe():
    
    def add_recipe(self):

        business_id = session.get("business_id")
        