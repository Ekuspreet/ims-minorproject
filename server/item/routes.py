from app import app
from item.models import Item

@app.route("/item/add", methods=["POST"])
def add_item():
    return Item().add_item()

@app.route("/item/fetch", methods=["POST"])
def fetch_items():
    return Item().fetch_items()