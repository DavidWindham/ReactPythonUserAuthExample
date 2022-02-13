from . import auth
from .. import db
from .models import User, RefreshTokenBlacklist
from flask import request, abort
from flask_socketio import SocketIO, emit
from .. import socketio
from .conf import refresh_jwt, auth_conf

@socketio.on('message_log')
def handle_message(message):
    print("Message log: ", message)
    emit('test message', {'data': {'status': 'received', 'message': message}})


@socketio.on('message_emit')
def handle_message(message):
    print("Message emit: ", message)
    emit('test message', {'data': {'status': 'received', 'message': message}}, broadcast=True)

