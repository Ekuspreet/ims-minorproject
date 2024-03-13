from app import db

def update_info_document(business_id):
    business = db.businesses.find_one({"_id": business_id})

    num_employees = len(business["employees"])
    num_items = len(business["items"])
    num_recipes = len(business["recipes"])
    num_jobs = len(business["jobs"])
    
    db.BIZ_INFO.update_one(
        {"_id": "INFO01", "BIZ_INFO.id": business_id},
        {
            "$set": {
                "BIZ_INFO.$.employees": num_employees,
                "BIZ_INFO.$.items": num_items,
                "BIZ_INFO.$.recipes": num_recipes,
                "BIZ_INFO.$.jobs": num_jobs,
            }
        }
    )