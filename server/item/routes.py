from app import app
from item.models import Item

@app.route("/item/add", methods=["POST"])
def add_item():
    return Item().add_item()

@app.route("/item/remove", methods=["POST"])
def remove_item():
    return Item().remove_item()