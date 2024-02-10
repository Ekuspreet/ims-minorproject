from flask import redirect, render_template
from app import app
from user.models import User

@app.route('/user/signup', methods=["POST"])
def signup():
    user = User()
    return user.signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/login', methods=["POST"])
def login():
    return User().login()

@app.route('/user/delete', methods=["POST"])
def delete():
    return User().delete_user()