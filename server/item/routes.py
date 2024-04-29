from app import app
from item.models import Item

@app.route("/item/add", methods=["POST"])
def add_item():
    return Item().add_item()
    
@app.route("/item/update", methods=["POST"])
def update_item():
    return Item().update_item()

@app.route("/item/fetch")
def fetch_items():
    return Item().fetch_items()
    
    
@app.route("/item/delete", methods=["POST"])
def delete_item():
    return Item().delete_item()
