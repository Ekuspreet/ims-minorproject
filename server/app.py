from flask import Flask, session, render_template, redirect
from flask_cors import CORS
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime, timedelta
from functools import wraps
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
URI = os.getenv('MONGO_URI')
app.config["MONGO_URI"] = URI
mongo = PyMongo(app)

# Database
client = MongoClient(URI , server_api=ServerApi('1'))
db = client.IMS_database

# Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if "logged_in" in session:
            return f(*args, **kwargs)
        
        else:
            return redirect('/')
        
    return wrap


# Routes
from user import routes

@app.route("/")
def home_page():
    return render_template("home.html")

@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html")
    
if __name__ == "__main__":
    app.run(debug=True)