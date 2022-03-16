from . import auth
from .. import db
from .models import User, RefreshTokenBlacklist
from flask import request, g
from .conf import refresh_jwt, auth_conf
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
    print(user)
    print(user.username)

    if user.validate_password(old_password):
        print("Password was validated")
        print("Password to send: ", new_password)
        user.password = new_password
        print("Password changed")
        db.session.commit()
        return {"status": "password change successful"}

    print("Password was invalid")
    raise (InvalidUsage('Incorrect old password', status_code=400))


@auth.route("/forgot_password", methods=["GET"])
def forgot_password():
    pass


@auth.route("/protected", methods=["GET"])
@auth_conf.login_required()
def protected():
    print("Protected route has been accessed, user is authenticated")
    return "Protected route has been accessed"
