import unittest
from app import create_app, db
import json


class ChatTestingParent(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client(use_cookies=True)
        self.setupUser()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def clearDB(self):
        db.drop_all()
        db.create_all()
        self.setupUser()

    def setupUser(self):
        self.username = "test_username"
        self.password = "test_password"
        self.email = "test_email@email.com"
        self.nickname = "test_nickname"

        response = self.client.post(
            '/register',
            data=json.dumps(
                {
                    "username": self.username,
                    "password": self.password,
                    "email": self.email,
                    "nickname": self.nickname
                }),
            content_type='application/json'
        )

        self.access_token = response.json['access_token']
        self.refresh_token = response.json['refresh_token']

    def getRequest(self, url):
        return self.client.get(
            url,
            headers={
                "Authorization": 'Bearer ' + self.access_token,
                "RefreshToken": self.refresh_token
            }
        )

    def postRequest(self, url, data):
        return self.client.post(
            url,
            data=data,
            headers={
                "Authorization": 'Bearer ' + self.access_token,
                "RefreshToken": self.refresh_token
            }
        )

    def postJSONRequest(self, url, data):
        return self.client.post(
            url,
            data=json.dumps(data),
            content_type='application/json',
            headers={
                "Authorization": 'Bearer ' + self.access_token,
                "RefreshToken": self.refresh_token
            }
        )
