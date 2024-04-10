from app import app
from product.models import Product

@app.route("/product/fetch")
def fetch_products():
    return Product().fetch_products()

@app.route("/product/add", methods = ["POST"])
def add_product():
    return Product().add_product()

@app.route("/product/add_item")
def product_item():
    return Product.product_item()

@app.route("/product/remove", methods = ["POST"])
def remove_product():
    return Product().remove_product()

@app.route("/product/remove_item")
def remove_item():
    return Product.remove_item()