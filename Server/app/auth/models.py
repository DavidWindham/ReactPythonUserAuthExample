from .. import db

from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .conf import jwt, auth_conf
from flask import g


class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True)
    username = db.Column(db.String(64), unique=True)
    nickname = db.Column(db.String(64))

    password_hash = db.Column(db.String(128))

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def validate_password(self, password):
        return check_password_hash(self.password_hash, password)

    # Generates the auth token
    def generate_auth_token(self):
        return jwt.dumps({"username": self.username, "email": self.email})

    # Generates new access token from refresh token
    @staticmethod
    @auth_conf.verify_token
    def verify_auth_token(token):
        g.user = None
        try:
            data = jwt.loads(token)
        except Exception as why:
            print("Verify auth token error: ", why)
            # TODO: Implement specific except catches, currently catchall error = failed
            return False

        if "username" and "email" in data:
            g.user = data["username"]
            g.email = data['email']
            return True

        return False
