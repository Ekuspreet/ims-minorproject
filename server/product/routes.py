from app import app
from product.models import Product

@app.route("/product/add", methods = ["POST"])
def add_product(business_id):
    return Product().add_product()

@app.route("/product/add_item")
def product_item():
    return Product.product_item()