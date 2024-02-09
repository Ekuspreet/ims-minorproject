from flask import Flask, session, render_template, redirect
from flask_pymongo import PyMongo
import pymongo
from datetime import datetime, timedelta
from functools import wraps
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# Database
client = pymongo.MongoClient('localhost', 27017)
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