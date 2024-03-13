from app import db

def update_info_document(business_id):
    business = db.businesses.find_one({"_id": business_id})

    num_employees = len(business["employees"])
    num_items = len(business["items"])
    num_recipes = len(business["recipes"])
    num_jobs = len(business["jobs"])
    
    db.BIZ_INFO.update_one(
        {"_id": "INFO01"},
        {
            "$set": {
                f"BIZ_INFO.{business_id}.employees": num_employees,
                f"BIZ_INFO.{business_id}.items": num_items,
                f"BIZ_INFO.{business_id}.recipes": num_recipes,
                f"BIZ_INFO.{business_id}.jobs": num_jobs,
            }
        }
    )