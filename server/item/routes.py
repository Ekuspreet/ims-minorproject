from app import app
from item.models import Item

@app.route("/item/add")
def add_item():
    return Item().add_item()

@app.route("/item/remove")
def remove_item():
    return Item().remove_item()