from flask import Blueprint

books_api = Blueprint('books_api', __name__, url_prefix="/books_api")

from . import routes