from flask import Blueprint

chat = Blueprint("chat", __name__)

from . import controllers
from . import websocket_controllers
from .models import ChatItem