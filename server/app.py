# Import the Flask module
from flask import Flask, render_template, jsonify
from flask_cors import CORS
# Create an instance of the Flask class
app = Flask(__name__)
CORS(app)
# Define a route and a corresponding function
@app.route('/')
def home():
    return jsonify()

# Define another route with a dynamic parameter
@app.route('/greet/<name>')
def greet(name):
    return f'Hello, {name}!'

# Define a route that renders an HTML template
@app.route('/template')
def render_template_example():
    return render_template('index.html', title='Flask Template', content='This is rendered from a template.')

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True,port=8000 )
