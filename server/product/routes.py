from app import app
from product.models import Product

@app.route("/product/<business_id>/add", methods = ["POST"])
def add_product(business_id):
    return Product().add_product(business_id)