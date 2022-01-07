from . import auth
from .. import db
from .models import User, RefreshTokenBlacklist
from flask import request, abort
from .conf import refresh_jwt, auth_conf


@auth.route("/login", methods=["POST"])
def login():
    username, password = (
        request.json.get("username"),
        request.json.get("password"),
    )

    if username is None or password is None:
        abort(400, "Invalid Inputs")

    user = User.query.filter_by(username=username).first()

    if user is None:
        abort(400, "Username not found")

    if not user.validate_password(password):
        abort(400, "Incorrect Password")

    access_token = user.generate_auth_token()
    refresh_token = refresh_jwt.dumps({"username": username})

    return {
        "access_token": access_token.decode(),
        "refresh_token": refresh_token.decode(),
    }


@auth.route("/refresh_token", methods=["GET"])
def refresh_access_token():
    refresh_token = request.headers.get("Authorization")

    try:
        data = refresh_jwt.loads(refresh_token)
    except Exception as why:
        print("Errored on refresh token", why)
        abort(400)

    blacklist_token_check = RefreshTokenBlacklist.query.filter_by(
        refresh_token=refresh_token
    ).first()

    if blacklist_token_check is not None:
        abort(400, "Token has been invalidated")

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
        abort(400, "Token already invalidated")

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

    if username == "" or password == "" or email == "" or nickname == "":
        abort(400)

    u = User()
    u.username = username
    u.nickname = nickname
    u.email = email
    u.password = password

    db.session.add(u)
    db.session.commit()

    return "Register"


@auth.route("/protected", methods=["GET"])
@auth_conf.login_required()
def protected():
    print("Protected route has been accessed, user is authenticated")
    return "Protected route has been accessed"
