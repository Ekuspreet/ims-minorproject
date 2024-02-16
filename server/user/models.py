from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid


class User:
    
    def start_session(self, user):
        del user["password"]
        session['logged_in'] = True
        session['user'] = user
        return jsonify(session['logged_in']), 200
    
    def signup(self):
        
        # create user object
        user = {
            "_id": uuid.uuid4().hex,
            "business": request.json["business"],
            "name" : request.json["name"],
            "email": request.json["email"],
            "password": request.json["password"]
        }
        
        # Encrypt the password
        user["password"] = pbkdf2_sha256.encrypt(user['password'])
        
        # Check for existing email address
        if db.users.find_one({ "email": user['email'] }):
            return "Email Already exists", 201
        else:
            if db.users.insert_one(user):
                return self.start_session(user)
            
        return jsonify( { "error": "Signup failed" } ), 400
    
    
    
    def signout(self):
        session.clear()
        return redirect("/")
    
    
    def login(self):
        
        user = db.users.find_one({
            "email": request.json["email"]
        })
        
        if user and pbkdf2_sha256.verify(request.json["password"], user['password']):
            return self.start_session(user)
        
        return jsonify({
            "error": "Credentials not found"
        }), 401
        
    def delete_user(self):
        if 'user' in session:
            user_id = session['user']['_id']
            # Find the user in the database
            user = db.users.find_one({ "_id": user_id })
            
            # If user found, delete it
            if user:
                db.users.delete_one({ "_id": user_id })
                session.clear()  # Clear the session after deleting the user
                return jsonify({ "message": "User deleted successfully" }), 200
            else:
                return jsonify({ "error": "User not found" }), 404
        else:
            return jsonify({ "error": "User not logged in" }), 401