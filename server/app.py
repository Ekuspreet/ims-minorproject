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
info_file = ""

# Database
client = MongoClient(URI , server_api=ServerApi('1'))
db = client.IMS_database

# Routes
from business import routes
from item import routes


@app.route("/autoauthenticate")
def autoauthenticate():
    if "logged_in" in session:
        return jsonify({'isLoggedIn': True})
    else:
        return jsonify({'isLoggedIn': False})

    
if __name__ == "__main__":
    app.run(debug=True)