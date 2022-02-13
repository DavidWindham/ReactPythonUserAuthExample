from flask_httpauth import HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as JsonWebToken

jwt = JsonWebToken("Init token test", expires_in=5)
refresh_jwt = JsonWebToken("Refresh token test", expires_in=2400)
auth_conf = HTTPTokenAuth("Bearer")
