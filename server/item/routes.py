from app import app
from item.models import Item

@app.route("/item/add", methods=["POST"])
def add_item():
    return Item().add_item()
    

@app.route("/item/fetch", methods=["POST"])
def fetch_items():
    return Item().fetch_items()
    
    
@app.route("/item/<item_id>/delete", methods=["POST"])
def delete_item(item_id):
    return Item().delete_item(item_id)
