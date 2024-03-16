from flask import Blueprint

reviews_api = Blueprint('reviews_api', __name__, url_prefix="/reviews_api")

from . import routes