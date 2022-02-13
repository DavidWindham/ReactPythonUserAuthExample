from . import chat
from .. import db
from .models import ChatItem
from ..auth.models import User
from ..auth.conf import auth_conf
from flask import request, abort, g
import datetime
# from flask import request, abort
from flask import jsonify


@chat.route("/get_chat_items", methods=["GET"])
@auth_conf.login_required()
def get_chat_items():
    chat_items = ChatItem.query.order_by(ChatItem.timestamp.desc()).limit(5).all()
    chat_items_out= [x.serialize() for x in chat_items]
    return jsonify(chat_items_out)


@chat.route("/submit_chat_item", methods=["POST"])
@auth_conf.login_required()
def submit_chat_item():
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

    return 200, {"status": "success", "message": new_chat_item}


@chat.route("/get_chat_item", methods=["GET"])
@auth_conf.login_required()
def get_chat_item(item_id):
    pass
