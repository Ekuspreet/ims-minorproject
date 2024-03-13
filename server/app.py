from flask import Flask, session, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
URI = os.getenv('MONGO_URI')
app.config["MONGO_URI"] = URI
mongo = PyMongo(app)
jwt = JWTManager(app)

# Database
client = MongoClient(URI , server_api=ServerApi('1'))
db = client.IMS_database

# Routes
from business import routes
# from item import routes

@app.route("/")
def index():
    business = {
        "_id": "INFO01",
        "BIZ_NO": 0,
        "BIZ_INFO": {
            "BIZ_ID": {
                "users": 0,
                "items": 0,
                "recipes": 0,
                "jobs": 0
            }
        }
    }
    db.BIZ_INFO.insert_one(business)
    return "Ethe rakh"

@app.route("/autoauthenticate")
def autoauthenticate():
    if "logged_in" in session:
        return jsonify({'isLoggedIn': True})
    else:
        return jsonify({'isLoggedIn': False})

    
def update_info_document(business_id):
    business = db.businesses.find_one({"_id": business_id})

    num_employees = len(business["employees"])
    num_items = len(business["items"])
    num_recipes = len(business["recipes"])
    num_jobs = len(business["jobs"])

    BIZ_INFO = "BIZ_INFO"

    db.BIZ_INFO.update_one(
        {"_id": "INFO01"},
        {
            "$set": {
                f"BIZ_INFO.{business_id}.employees": num_employees,
                f"BIZ_INFO.{business_id}.items": num_items,
                f"BIZ_INFO.{business_id}.recipes": num_recipes,
                f"BIZ_INFO.{business_id}.jobs": num_jobs,
            }
        }
    )


if __name__ == "__main__":
    app.run(debug=True)