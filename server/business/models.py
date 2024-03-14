from flask import jsonify, request, session
from flask_jwt_extended import create_access_token
from passlib.hash import pbkdf2_sha256
from app import db

class Business:

    def start_session(self, user, business_id):
        
        del user["password"]
        session['logged_in'] = True
        
        session['user'] = user
        session["business_id"] = business_id
        
        additional_claims = {
            "name": user["name"],
            "role": user["role"],
            "business_id": business_id
        }
        
        jwt_token = create_access_token(identity=user["name"], additional_claims = additional_claims)
        
        return jsonify(jwt_token=jwt_token), 200
    
    def signup(self):
        
        BIZ_ID = self.get_business_id()

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
                "_id": BIZ_ID,
                "business_name" : business_name,
                "emp_no": 1,
                "item_no": 0,
                "recipe_no": 0,
                "job_no": 0,
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
            
            if db.businesses.update_one({'_id': BIZ_ID}, {'$push': {'employees': employee}}):
                return self.start_session(employee, BIZ_ID)
            
        return jsonify( { "error": "Signup failed" } ), 400
    
    
    
    def signout(self):
        session.clear()
        return jsonify({"success": True})
    
    
    def login(self):
        
        business_id = request.json["business_id"]
        email = request.json["email"]
        password = request.json["password"]
        role = request.json["role"]
        
        business = db.businesses.find_one({"_id" : business_id})
        if not business:
            return jsonify({"error": "business id is invalid"})
        
        employee = next((emp for emp in business.get('employees', []) if emp['email'] == email), None)
        
        if employee and pbkdf2_sha256.verify(password, employee['password']) and (employee["role"] == role):
            return self.start_session(employee, business_id)
        
        return jsonify({
            "error": "Credentials not found"
        }), 401
        
        
    def add_employee(self, business_id):

        name = request.json["name"]
        email = request.json["email"]
        role = request.json["role"]
        password = request.json["password"]

        employee_id = self.get_employee_id(business_id)

        employee = {
            "employee_id": employee_id,
            "name" : name,
            "email": email,
            "password": password,
            "role": role
        }
        
        employee["password"] = pbkdf2_sha256.encrypt(employee['password'])
        
        if db.businesses.count_documents({"_id": business_id, "employees.email": employee['email'] }):
            return "Email Already exists", 201
        else:
            if db.businesses.update_one({'_id': business_id}, {'$push': {'employees': employee}}):
                return jsonify({"success" : True}), 200
            else:
                return jsonify({"success": False, "message": "Failed to create employee"}), 500
    

    def fetch_employees(self, business_id):
        employee_list = []

        business = db.businesses.find_one({"business_id": business_id})

        # Retrieve the employee_list from the business document
        if business:
            employee_list = business.get("employees", [])
            return jsonify({"success": True,"employee_list": employee_list})
        else:
            return jsonify({"success": False, "error": "Could not fetch employees"})
    
    def change_password(self, business_id, employee_id):
        
        old_password = request.json["old_password"]
        new_password = request.json["new_password"]
        
        business = db.businesses.count_documents({"business_id": business_id, "employees.employee_id": employee_id})
        
        employee = next((emp for emp in business["employees"] if emp["employee_id"] == employee_id), None)

        if employee:
            if pbkdf2_sha256.verify(employee["password"], old_password):
                db.businesses.update_one({ "_id": business_id, "employees.employee_id": employee_id }, { "$set": { "employees.$.password": new_password}})
                return jsonify({"success": True, "message": "Password has been updated"})
            
            else:
                return jsonify({"success": False, "message": "Password is incorrect"})
                
    
    def remove_employee(self, business_id, employee_id):

        if db.businesses.count_documents({"business_id": business_id, "employees.employee_id": employee_id}):

            if db.businesses.delete_one({"business_id": business_id, "employees.employee_id": employee_id}):
                return jsonify({"success": "Employee has been removed"})
            
            else:
                return jsonify({"error": "Could not remove employee"})
                    
    def get_business_id(self):

        try:
            data = db.businesses.find_one({"_id": "INFO01"})
            BIZ_NO = data["BIZ_NO"] + 1
            db.businesses.update_one({"_id": "INFO01"}, {"$set": {"BIZ_NO": BIZ_NO}})

        except:
            biz_info = {
                "_id": "INFO01",
                "BIZ_NO": 1
            }
            db.businesses.insert_one(biz_info)
            BIZ_NO = 1

        return ("BIZ0" + str(BIZ_NO))
    
    def get_employee_id(self, business_id):
        business = db.businesses.find_one({"_id": business_id})
        EMP_NO = business["emp_no"] + 1
        db.businesses.update_one({"_id": business_id}, {"$set": {"emp_no": EMP_NO}})
        return ("EMP0" + str(EMP_NO))