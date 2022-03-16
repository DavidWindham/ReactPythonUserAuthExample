import datetime

from . import auth
from .. import db
from .models import User, RefreshTokenBlacklist, ForgotPasswordToken
from flask import request, g
from .conf import refresh_jwt, auth_conf, reset_serializer
from ..error.classes import InvalidUsage


@auth.route("/login", methods=["POST"])
def login():
    username, password = (
        request.json.get("username"),
        request.json.get("password"),
    )

    if username is None or password is None:
        raise (InvalidUsage('Username or Password not set', status_code=400))

    user = User.query.filter_by(username=username).first()

    if user is None:
        raise (InvalidUsage('Username not found', status_code=400))

    if not user.validate_password(password):
        raise (InvalidUsage('Password not found', status_code=400))

    access_token = user.generate_auth_token()
    refresh_token = refresh_jwt.dumps({"username": username})

    return {
        "access_token": access_token.decode(),
        "refresh_token": refresh_token.decode(),
    }


@auth.route("/refresh_token", methods=["GET"])
def refresh_access_token():
    refresh_token = request.headers.get("RefreshToken")

    try:
        data = refresh_jwt.loads(refresh_token)
    except Exception as why:
        print("Errored on refresh token", why)
        raise (InvalidUsage('Token refresh error', status_code=400))

    blacklist_token_check = RefreshTokenBlacklist.query.filter_by(
        refresh_token=refresh_token
    ).first()

    if blacklist_token_check is not None:
        raise (InvalidUsage('Token is blacklisted', status_code=400))

    user = User(username=data["username"])
    refreshed_access_token = user.generate_auth_token()
    return {"access_token": refreshed_access_token.decode()}


@auth.route("/logout", methods=["GET"])
@auth_conf.login_required()
def logout():
    refresh_token = request.headers.get("RefreshToken")
    token_blacklist_if_already_blacklisted = RefreshTokenBlacklist.query.filter_by(
        refresh_token=refresh_token
    ).first()

    # If token is already been placed on blacklist
    if token_blacklist_if_already_blacklisted is not None:
        raise (InvalidUsage('Token already blacklisted', status_code=400))

    blacklist_refresh_token = RefreshTokenBlacklist(refresh_token=refresh_token)

    db.session.add(blacklist_refresh_token)
    db.session.commit()
    return {"status": "Token has been invalidated"}


@auth.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")
    nickname = request.json.get("nickname")

    if username == "":
        raise (InvalidUsage('Username is invalid', status_code=400))
    if password == "":
        raise (InvalidUsage('Password is invalid', status_code=400))
    if email == "":
        raise (InvalidUsage('Email is invalid', status_code=400))
    if nickname == "":
        raise (InvalidUsage('Nickname is invalid', status_code=400))

    u = User()
    u.username = username
    u.nickname = nickname
    u.email = email
    u.password = password

    db.session.add(u)
    db.session.commit()

    access_token = u.generate_auth_token()
    refresh_token = refresh_jwt.dumps({"username": username})

    return {
        "access_token": access_token.decode(),
        "refresh_token": refresh_token.decode(),
    }


@auth.route("/change_password", methods=["POST"])
@auth_conf.login_required()
def change_password():
    old_password = request.json.get("oldPassword")
    new_password = request.json.get("newPassword")
    if old_password == "" or old_password is None:
        raise (InvalidUsage('Old password is not set', status_code=400))
    if new_password == "" or new_password is None:
        raise (InvalidUsage('New password is not set', status_code=400))

    user = User.query.filter_by(username=g.user).first()
    print(user.username, user.email)
    if user.validate_password(old_password):
        user.password = new_password
        db.session.commit()
        return {"status": "password change successful"}

    raise (InvalidUsage('Incorrect old password', status_code=400))


@auth.route("/forgot_password_request", methods=["POST"])
def forgot_password_request():
    username = request.json.get("username")
    user_email = request.json.get("email")

    if (user_email == "" or user_email is None) and (username == "" or username is None):
        raise (InvalidUsage('Neither email nor username is not set', status_code=400))

    if user_email == "":
        user = User.query.filter_by(username=username).first()
    else:
        user = User.query.filter_by(email=user_email).first()

    if user is None:
        raise (InvalidUsage('User is not found', status_code=400))

    token_expiry = datetime.datetime.now() + datetime.timedelta(minutes=1)
    token_hash = reset_serializer.dumps(str(user.id) + str(token_expiry))
    new_reset_token = ForgotPasswordToken(token=token_hash, expiry_date_time=token_expiry, user_id=user.id, user=user)
    db.session.add(new_reset_token)
    db.session.commit()

    # TODO: Email(token) and remove from return for actual project

    return {
        "status": "forgot token sent",
        "token": new_reset_token.token
    }


@auth.route("/forgot_password_change", methods=["POST"])
def forgot_password_change():
    username = request.json.get("username")
    user_email = request.json.get("email")
    reset_token = request.json.get("resetToken")
    new_password = request.json.get("newPassword")

    token = ForgotPasswordToken.query.filter_by(token=reset_token).first()

    if token is None:
        raise (InvalidUsage('Token is invalid', status_code=400))

    if token.used:
        raise (InvalidUsage('Token has been used', status_code=400))

    if token.expiry_date_time < datetime.datetime.now():
        raise (InvalidUsage('Token has expired', status_code=400))

    token.used = True
    db.session.commit()

    if user_email == "":
        user = User.query.filter_by(username=username).first()
    else:
        user = User.query.filter_by(email=user_email).first()
    user.password = new_password
    db.session.commit()

    return {"status": "Password changed"}


@auth.route("/protected", methods=["GET"])
@auth_conf.login_required()
def protected():
    print("Protected route has been accessed, user is authenticated")
    return "Protected route has been accessed"
