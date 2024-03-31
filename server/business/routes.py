from flask import session, jsonify
from app import app
from business.models import Business

@app.route('/user/signup', methods=["POST"])
def signup():
    return Business().signup()


@app.route('/user/signout', methods=["POST"])
def signout():
    return Business().signout()
    
@app.route("/user_info")
def user_info():
    return Business().user_info()

@app.route('/user/login', methods=["POST"])
def login():
    return Business().login()


@app.route('/user/<business_id>/add_employee', methods=["POST"])
def create(business_id):
    return Business().add_employee(business_id)


@app.route("/business/<business_id>/fetch_employees")
def fetch_employees(business_id):
    return Business().fetch_employees(business_id)
    

@app.route("/user/<business_id>/<employee_id>/change-password", methods=["POST"])
def change_password(business_id, employee_id):
    return Business().change_password(business_id, employee_id)
    

@app.route('/user/<business_id>/<employee_id>/remove', methods=["POST"])
def delete(business_id, employee_id):
    return Business().remove_employee(business_id, employee_id)

