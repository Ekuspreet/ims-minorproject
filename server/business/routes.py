from flask import session, jsonify
from app import app
from business.models import User

@app.route('/user/signup', methods=["POST"])
def signup():
    return User().signup()

@app.route('/user/<business_id>/signout')
def signout(business_id):
    if business_id == session.get("business_id"):
        return User().signout()
    
    else:
        return jsonify({"error": "business id did not match"})

@app.route('/user/login', methods=["POST"])
def login():
    return User().login()

@app.route('/user/create', methods=["POST"])
def create():
    return User().create_employee()
    
@app.route("/user/<business_id>/change-password", methods=["POST"])
def change_password(business_id):
    if business_id == session.get("business_id"):
        return User().change_password()
    
    else:
        return jsonify({"error": "business id did not match"})

# @app.route('/user/delete', methods=["POST"])
# def delete():
#     return User().delete_user()

