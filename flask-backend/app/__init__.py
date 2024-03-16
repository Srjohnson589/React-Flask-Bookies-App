from flask import Flask
from config import Config
from flask_login import LoginManager
from app.models import db, User
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

login_manager = LoginManager()

login_manager.init_app(app)
db.init_app(app)
migrate = Migrate(app, db)

from app.blueprints.auth_api import auth_api
from app.blueprints.books_api import books_api
from app.blueprints.reviews_api import reviews_api

app.register_blueprint(auth_api)
app.register_blueprint(books_api)
app.register_blueprint(reviews_api)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)