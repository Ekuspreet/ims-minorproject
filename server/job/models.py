from flask import request, session, jsonify
from app import db

class Job:

    def fetch_jobs(self):
        business_id = session.get("business_id")
        business = db.businesses.find_one({"_id": business_id})
        jobs = business.get("jobs")
        active_jobs = []
        for job in jobs:
            if job["status"] is not "finished":
                active_jobs.append(job)

        return jsonify({"active_jobs": active_jobs})

    def add_job(self):
        business_id = session.get("business_id")
        product_id = request.json.get("product_id")
        product_name = request.json.get("product_name")
        quantity = int(request.json.get("quantity"))
        job_id = self.get_job_id(business_id)
        job = {
            "job_id": job_id,
            "product_id": product_id,
            "product": product_name,
            "quantity": quantity,
            "status": "pending"
        }
        db.businesses.update_one({"_id": business_id}, {"$push": {}})

    def get_job_id(self, business_id):
        business = db.businesses.find_one({"_id": business_id})
        JOB_NO = business["job_no"] + 1
        db.businesses.update_one({"_id": business_id}, {"$set": {"job_no": JOB_NO}})
        return ("JOB0" + str(JOB_NO))