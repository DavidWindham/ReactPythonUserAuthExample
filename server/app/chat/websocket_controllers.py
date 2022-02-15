from flask_socketio import SocketIO, emit
from .. import socketio


@socketio.on('new_chat_message_added')
def handle_new_message_emit():
    emit('new chat message ready', {'data': {'status': 'new message received'}}, broadcast=True)
