from .. import db
from ..auth.models import User
from .models import ChatItem
from flask_socketio import SocketIO, emit
from .. import socketio
# from .conf import refresh_jwt, auth_conf
import datetime
from ..auth.conf import auth_conf


@socketio.on('message_log')
def handle_message_log(message):
    print("Message log: ", message)
    emit('test message', {'data': {'status': 'received', 'message': message}})


@socketio.on('message_emit')
def handle_message_emit(message):
    print("Message emit: ", message)
    emit('test message', {'data': {'status': 'received', 'message': message}}, broadcast=True)


@socketio.on('chat_submit')
@auth_conf.login_required()
def chat_message_submit(message):
    print("Chat message submitted:", message)