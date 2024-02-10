from flask import redirect, render_template
from app import app
from user.models import User

@app.route('/user/signup', methods=["POST"])
def signup():
    user = User()
    
    user_data, status_code = user.signup()
    
    if status_code == 200:
        # If sign-up is successful, redirect to the dashboard route
        return redirect("/dashboard")
    
    return user.signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/login', methods=["POST"])
def login():
    user = User().login()
    return render_template("dashboard.html")

@app.route('/user/delete', methods=["POST"])
def delete():
    return User().delete_user()