from flask import Blueprint

auth_api = Blueprint('auth_api', __name__, url_prefix="/auth_api")

from . import routes