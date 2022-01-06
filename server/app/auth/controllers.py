from . import auth
from .. import db
from .models import User
from flask import request, abort
from .conf import refresh_jwt, auth_conf


@auth.route('/login', methods=['POST'])
def login():
    username, password = (
        request.json.get('username'),
        request.json.get('password'),
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
        "refresh_token": refresh_token.decode()
    }


@auth.route('/refresh_token', methods=['GET'])
def refresh_access_token():
    refresh_token = request.headers.get('Authorization')

    try:
        data = refresh_jwt.loads(refresh_token)
    except Exception as why:
        print("Errored on refresh token", why)
        abort(400)

    user = User(username=data["username"])
    refreshed_access_token = user.generate_auth_token()
    return {"access_token": refreshed_access_token.decode()}


@auth.route('/logout')
@auth_conf.login_required
def logout():
    # TODO: Implement a logout, force expire the tokens server side
    return "Logout"


@auth.route('/register', methods=['POST'])
def register():
    print("Register called")
    username = request.json.get('username')
    if username == "fail":
        print("In here")
        abort(400, "This shoulda failed")
    print(username)
    password = request.json.get('password')
    email = request.json.get('email')
    nickname = request.json.get('nickname')

    if username == "" or password == "" or email == "" or nickname == "":
        print("Something was missing")
        abort(400)

    u = User()
    u.username = username
    u.nickname = nickname
    u.email = email
    u.password = password

    db.session.add(u)
    db.session.commit()

    return "Register"


@auth.route('/protected', methods=['GET'])
@auth_conf.login_required()
def protected():
    print("Protected route has been accessed, user is authenticated")
    return "Protected route has been accessed"
