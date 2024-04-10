from flask import session, jsonify
from app import app
from business.models import Business

@app.route('/user/signup', methods=["POST"])
def signup():
    return Business().signup()


@app.route('/user/signout')
def signout():
    return Business().signout()
    
@app.route("/user_info")
def user_info():
    return Business().user_info()

@app.route('/user/login', methods=["POST"])
def login():
    return Business().login()


@app.route('/user/add_employee', methods=["POST"])
def create():
    return Business().add_employee()


@app.route("/business/fetch_employees")
def fetch_employees():
    return Business().fetch_employees()
    

@app.route("/user/change-password", methods=["POST"])
def change_password():
    return Business().change_password()
    

@app.route('/user/remove', methods=["POST"])
def delete():
    return Business().remove_employee()

