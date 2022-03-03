from . import error
from flask import jsonify
from .classes import InvalidUsage


@error.app_errorhandler(InvalidUsage)
def handle_invalid_usage(error_arg):
    response = jsonify(error_arg.to_dict())
    response.status_code = error_arg.status_code
    return response
