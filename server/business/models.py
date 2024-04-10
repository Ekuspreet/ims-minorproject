from flask import jsonify, request, session
from passlib.hash import pbkdf2_sha256
from app import db

class Business:

    def start_session(self, user, business_id, login):
        
        additional_claims = {
            "user_id": user["employee_id"]
        }

        if login:
            additional_claims["isLoggedIn"] = True
            del user["password"]
            session['logged_in'] = True
            session['user'] = user
            session["business_id"] = business_id
            return jsonify({"Response": "Baba ji ka thullu"}), 200
        
        return business_id, 200
    
    def user_info(self):
        if "logged_in" in session:
            return jsonify({"user_info": session, "business_id": session["business_id"]})
        else:
            return jsonify({"user_info": {"logged_in": False}})
    
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
                "product_no": 0,
                "job_no": 0,
                "employees": [],
                "items": [],
                "products": [],
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
                return self.start_session(employee, BIZ_ID, False)
            
        return jsonify( { "error": "Signup failed" } ), 400
    
    
    
    def signout(self):
        if session.clear():
            return jsonify({"success": True})
        
        else:
            return jsonify({"Error": "Could not logout"})
    
    
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
            return self.start_session(employee, business_id, True)
        
        return jsonify({
            "error": "Credentials not found"
        }), 401
        
        
    def add_employee(self):

        name = request.json["name"]
        email = request.json["email"]
        role = request.json["role"]
        password = request.json["password"]
        business_id = session.get("business_id")

        employee_id = self.get_employee_id(business_id)

        if employee_id == None:
            return jsonify({"Error": "Business Id is not correct"})

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
    

    def fetch_employees(self):
        employee_list = []
        business_id = session.get("business_id")
        business = db.businesses.find_one({"_id": business_id})

        # Retrieve the employee_list from the business document
        if business:
            employee_list = business.get("employees", [])
            employees_info = []
            for emp in employee_list:
                employee_info = {"name": emp["name"], "employee_id": emp["employee_id"], "role": emp["role"]}
                employees_info.append(employee_info)

            return jsonify({"success": True,"employee_list": employees_info})
        else:
            return jsonify({"success": False, "error": "Could not fetch employees"})
    
    def change_password(self, employee_id):
        business_id = session.get("business_id")
        old_password = request.json["old_password"]
        new_password = request.json["new_password"]
        
        business = db.businesses.find_one({"_id": business_id, "employees.employee_id": employee_id})
        
        for employee in business["employees"]:
            if employee["employee_id"] == employee_id:
                if pbkdf2_sha256.verify(old_password, employee["password"]):
                    new_password = pbkdf2_sha256.encrypt(new_password)
                    db.businesses.update_one({ "_id": business_id, "employees.employee_id": employee_id }, { "$set": { "employees.$.password": new_password}})
                    return jsonify({"success": True, "message": "Password has been updated"})
                
                else:
                    return jsonify({"success": False, "message": "Password is incorrect"})
            
    
    def remove_employee(self, employee_id):
        business_id = session.get("business_id")
        if db.businesses.count_documents({"_id": business_id, "employees.employee_id": employee_id}):
            result = db.businesses.update_one(
                {"_id": business_id},
                {"$pull": {"employees": {"employee_id": employee_id}}}
            )
            
            if result.modified_count == 1:
                return jsonify({"success": "Employee has been removed"})
            
            else:
                return jsonify({"error": "Could not remove employee"})
        
        else:
            return jsonify({"error": "Employee not found"})
                    
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
        if business:
            EMP_NO = business["emp_no"] + 1
            db.businesses.update_one({"_id": business_id}, {"$set": {"emp_no": EMP_NO}})
            return ("EMP0" + str(EMP_NO))
        
        else:
            return None