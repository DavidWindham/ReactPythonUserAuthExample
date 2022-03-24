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

    def wipeDB(self):
        db.drop_all()
        db.create_all()

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
                'RefreshToken': refresh_token
            }
        )

    def callProtectedRoute(self, access_token):
        return self.client.get(
            '/protected',
            headers={
                'Authorization': 'Bearer ' + access_token
            }
        )

    def getRequest(self, url):
        return self.client.get(
            url
        )

    def postRequest(self, url, data):
        return self.client.post(
            url,
            data=json.dumps(data),
            content_type='application/json'
        )

    def getRequestAuthenticated(self, url, access_token):
        return self.client.get(
            url,
            headers={
                'Authorization': 'Bearer ' + access_token
            }
        )

    def postRequestAuthenticated(self, url, data, access_token):
        return self.client.post(
            url,
            data=json.dumps(data),
            headers={
                'Authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )
