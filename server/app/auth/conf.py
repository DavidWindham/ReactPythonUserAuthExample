from flask_httpauth import HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as JsonWebToken
from itsdangerous import URLSafeSerializer

jwt = JsonWebToken("Init token test", expires_in=5)
refresh_jwt = JsonWebToken("Refresh token test", expires_in=2400)
auth_conf = HTTPTokenAuth("Bearer")

# For password reset
reset_serializer = URLSafeSerializer('secret-key', salt="reset")
