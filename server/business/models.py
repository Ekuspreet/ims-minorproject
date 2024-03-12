from flask import jsonify, request, session 
from flask_jwt_extended import create_access_token
from passlib.hash import pbkdf2_sha256
from app import db
from app import info_file
import uuid
import json


class User:

    def start_session(self, user, signIn, business_id):
        
        del user["password"]
        session['logged_in'] = True
        
        session['user'] = user
        session["business_id"] = business_id
        
        additional_claims = {
            "name": user["name"],
            "role": user["role"]
        }
        
        if signIn:
            additional_claims["business_id"] = business_id
        
        jwt_token = create_access_token(identity=user["name"], additional_claims = additional_claims)
        
        return jsonify(jwt_token=jwt_token), 200
    
    def signup(self):
        
        # Extract the business number to assign to new business
        with open(info_file, 'r') as f:
            data = json.load(f)

        BIZ_NO = data.get("BIZ_NO") + 1
        BIZ_ID = "BIZ0" + str(BIZ_NO)

        # update business number and push into json file
        data["BIZ_NO"] = BIZ_NO
        data["BIZ_INFO"][BIZ_ID] = {'employee':1, 'items':0}
        with open(info_file, 'w') as f:
            json.dump(data, f)

        # extract data from form request
        business_name = request.json["business"]
        email = request.json["email"]
        name = request.json["name"]
        password = request.json["password"]
        
        # Check for existing email address
        if db.businesses.find_one({ "employees.email": email }):
            return "Email Already exists", 201
        
        else:
            employee_id = 'EMP01'
            
            # create business object
            business = {
                "_id": uuid.uuid4().hex,
                "business_name" : business_name,
                "business_id": BIZ_ID,
                "employees": [],
                "items": [],
                "recipes": [],
                "jobs": []
            }
            
            # create employee object
            employee = {
                "employee_id" : employee_id,
                "name" : name,
                "email" : email,
                "role" : "admin",
                "password" : password
            }
            
            employee["password"] = pbkdf2_sha256.encrypt(employee['password'])
        
            db.businesses.insert_one(business)
            if db.businesses.update_one({'business_id': BIZ_ID}, {'$push': {'employees': employee}}):
                return self.start_session(employee, True, BIZ_ID)
            
        return jsonify( { "error": "Signup failed" } ), 400
    
    
    
    def signout(self):
        session.clear()
        return jsonify({"success": True})
    
    
    def login(self):
        
        business_id = request.json["business_id"]
        email = request.json["email"]
        password = request.json["password"]
        role = request.json["role"]
        
        business = db.businesses.find_one({"business_id" : business_id})
        if not business:
            return jsonify({"error": "business id is invalid"})
        
        employee = next((emp for emp in business.get('employees', []) if emp['email'] == email), None)
        
        if employee and pbkdf2_sha256.verify(password, employee['password']) and (employee["role"] == role):
            return self.start_session(employee, False, business_id)
        
        return jsonify({
            "error": "Credentials not found"
        }), 401
        
        
    def create_employee(self):

        name = request.json["name"]
        email = request.json["email"]
        role = request.json["role"]
        password = request.json["password"]
        business_id = request.json['business_id']

        with open(info_file, 'r') as f:
            data = json.load(f)
        
        if business_id in data['BIZ_INFO']:
            employee_no = data['BIZ_INFO']['employee'] + 1

        employee_id = "EMP0" + str(employee_no)

        data['BIZ_INFO']['employee'] = employee_no

        with open(info_file, 'w') as f:
            json.dump(data, f)

        employee = {
            "employee_id": employee_id,
            "name" : name,
            "email": email,
            "password": password,
            "role": role
        }
        
        employee["password"] = pbkdf2_sha256.encrypt(employee['password'])
        
        if db.businesses.count_documents({"business_id": business_id, "employees.email": employee['email'] }):
            return "Email Already exists", 201
        else:
            if db.businesses.update_one({'business_id': business_id}, {'$push': {'employees': employee}}):
                return jsonify({"success" : True}), 200
            else:
                return jsonify({"success": False, "message": "Failed to create employee"}), 500
    

    def change_password(self):
        
        old_password = request.json["old_password"]
        new_password = request.json["new_password"]
        
        employee = db.businesses.find_one({
            "employees.employee_id": session["employee_id"]
        })
        
        if employee and pbkdf2_sha256.verify(old_password, employee['password']):
            
            new_password = pbkdf2_sha256.encrypt(new_password)
            db.businesses.update_one({"business_id": session["business_id"]}, {"employees.employee_id": session["employee_id"]}, {"$set": {"employees.$.password": new_password}})
            return jsonify({"success": True, "message": "Password changed successfully"}), 200
        
        else:
            return jsonify({"success": False, "message": "Password does not match"}), 401
                
    # def delete_user(self):
    #     if 'user' in session:
    #         user_id = session['user']['_id']
    #         # Find the user in the database
    #         user = db.users.find_one({ "_id": user_id })
            
    #         # If user found, delete it
    #         if user:
    #             db.users.delete_one({ "_id": user_id })
    #             session.clear()  # Clear the session after deleting the user
    #             return jsonify({ "message": "User deleted successfully" }), 200
    #         else:
    #             return jsonify({ "error": "User not found" }), 404
    #     else:
    #         return jsonify({ "error": "User not logged in" }), 401