from flask import session, jsonify
from app import app
from item.models import Item

@app.route("/item/<business_id>/add", methods=["POST"])
def add_item(business_id):
    if business_id == session.get("business_id"):
        return Item().add_item()
    
    else:
        return jsonify({"error": "business id did not match"})

@app.route("/item/<business_id>/fetch", methods=["POST"])
def fetch_items(business_id):
    if business_id == session.get("business_id"):
        return Item().fetch_items()
    
    else:
        return jsonify({"error": "business id did not match"})
    
@app.route("/item/<business_id>/<item_id>/delete", methods=["POST"])
def delete_item(business_id, item_id):

    if business_id == session.get("business_id"):
        return Item.delete_item(item_id)
    
    else:
        return jsonify({"error": "business id did not match"})