from app import create_app, db
import unittest
import json


class AuthTestingParent(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def registerUser(self, username, password, email, nickname):
        return self.client.post(
            '/register',
            data=json.dumps(
                {
                    "username": username,
                    "password": password,
                    "email": email,
                    "nickname": nickname
                }),
            content_type='application/json'
        )

    def loginUser(self, username, password):
        return self.client.post(
            '/login',
            data=json.dumps(
                {
                    "username": username,
                    "password": password,
                }),
            content_type='application/json'
        )

    def logoutUser(self, access_token, refresh_token):
        return self.client.get(
            '/logout',
            headers={
                'Authorization': 'Bearer ' + access_token,
                'RefreshToken': refresh_token
            }
        )

    def getAccessToken(self, refresh_token):
        return self.client.get(
            '/refresh_token',
            headers={
                'Authorization': refresh_token
            }
        )

    def callProtectedRoute(self, access_token):
        return self.client.get(
            '/protected',
            headers={
                'Authorization': 'Bearer ' + access_token
            }
        )
