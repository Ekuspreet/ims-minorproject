from app import app
from user.models import User

@app.route('/user/signup', methods=["POST"])
def signup():
    return User().signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/login', methods=["POST"])
def login():
    return User().login()

@app.route('/user/create', methods=["POST"])
def create():
    return User().create_user()

@app.route("/user/change-password", methods=["POST"])
def change_password():
    return User().change_password()

@app.route('/user/delete', methods=["POST"])
def delete():
    return User().delete_user()

