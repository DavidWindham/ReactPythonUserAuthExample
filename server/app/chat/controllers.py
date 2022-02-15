from . import chat
from .. import db
from .models import ChatItem
from ..auth.models import User
from ..auth.conf import auth_conf
from flask import request, abort, g
from flask import jsonify
import datetime


@chat.route("/get_chat_items", methods=["GET"])
@auth_conf.login_required()
def get_chat_items():
    chat_items = ChatItem.query.order_by(ChatItem.timestamp.desc()).limit(5).all()
    # Serializes the chat items, removes unserializable content
    chat_items_out = [chat_item.serialize() for chat_item in chat_items]
    return jsonify(chat_items_out)


@chat.route("/update_chat_items", methods=["POST"])
@auth_conf.login_required()
def update_chat_items():
    # Retrieves list of ID's that represent the messages currently loaded for client
    passed_id_list = request.json.get("id_array")
    chat_items = ChatItem.query.order_by(ChatItem.timestamp.desc()).limit(5).all()
    # Filters out the messages that are already present, will be costly for large number of messages
    chat_items_out = [x.serialize() for x in chat_items if x.id not in passed_id_list]
    return jsonify(chat_items_out)


@chat.route("/submit_chat_item", methods=["POST"])
@auth_conf.login_required()
def submit_chat_item():
    # Check likely not required, TODO: Determine removal
    if g.user is None:
        abort(400, "User is not set")

    message = request.json.get("message")
    if message is None or message is "":
        abort(400, "Message is not set")

    user = User.query.filter_by(username=g.user).first()
    if user is None:
        abort(400, "User is not found")

    timestamp = datetime.datetime.now()
    new_chat_item = ChatItem(user=user, user_id=user.id, message=message, timestamp=timestamp)

    db.session.add(new_chat_item)
    db.session.commit()

    return {"status": "success"}


@chat.route("/get_chat_item", methods=["GET"])
@auth_conf.login_required()
def get_chat_item(item_id):
    pass
