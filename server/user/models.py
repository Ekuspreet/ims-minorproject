from flask import jsonify, request, session, redirect
from flask_jwt_extended import create_access_token
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:
    
    def start_session(self, user):
        del user["password"]
        session['logged_in'] = True
        session['user'] = user
        
        jwt_token = create_access_token(identity=user["name"])
        
        return jsonify(jwt_token=jwt_token), 200
    
    def signup(self):
        
        # create user object
        user = {
            "_id": uuid.uuid4().hex,
            "name" : request.json["name"],
            "email": request.json["email"],
            "password": request.json["password"],
            "role": "admin"
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
        return jsonify({"success": True})
    
    
    def login(self):
        
        user = db.users.find_one({
            "email": request.json["email"]
        })
        
        if user and pbkdf2_sha256.verify(request.json["password"], user['password']) and (request.json["role"] == user["role"]):
            return self.start_session(user)
        
        return jsonify({
            "error": "Credentials not found"
        }), 401
        
        
    def create_user(self):
        user = {
            "_id": uuid.uuid4().hex,
            "name" : request.json["name"],
            "email": request.json["email"],
            "password": request.json["password"],
            "role": "employee"
        }
        
        user["password"] = pbkdf2_sha256.encrypt(user['password'])
        
        if db.users.find_one({ "email": user['email'] }):
            return "Email Already exists", 201
        else:
            if db.users.insert_one(user):
                return jsonify({"success" : True}), 200
    

    def change_password(self):
        user = db.users.find_one({
            "_id": session["_id"]
        })
        
        if user and pbkdf2_sha256.verify(request.json["old_password"], user['password']):
            
            new_password = pbkdf2_sha256.encrypt(request.json["new_password"])
            db.users.update_one({"_id": session["_id"]}, {"$set": {"password": new_password}})
            return jsonify({"success": True, "message": "Password changed successfully"}), 200
        
        else:
            return jsonify({"success": False, "message": "Password does not match"}), 401
                
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