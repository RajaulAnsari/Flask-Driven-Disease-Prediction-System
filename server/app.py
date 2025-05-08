from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from config import get_config
from routes import my_routes
import utils

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend
app.config.from_mapping(get_config())


mail=Mail(app)
mongo=PyMongo(app)
utils.mongo=mongo
bcrypt=Bcrypt(app)

#routes initialization
my_routes(app,mongo,mail,bcrypt)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
