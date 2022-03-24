from auth_parent_class import AuthTestingParent
import jwt
import json


class UserLoginTestCase(AuthTestingParent):
    def setUp(self):
        super().setUp()
        self.username = "Login Username"
        self.password = "login_password"
        self.email = "log@in.com"
        self.nickname = "loginuser"
        self.registerUser(
            username=self.username,
            password=self.password,
            email=self.email,
            nickname=self.nickname
        )

    def tearDown(self):
        super().tearDown()

    def test_login_basic(self):
        test_response = self.loginUser(
            username=self.username,
            password=self.password,
        )
        self.assertTrue(test_response.status_code, 200)

    def test_incorrect_username(self):
        test_response = self.loginUser(
            username="incorrect username",
            password=self.password,
        )
        self.assertFalse(test_response.status_code == 200)
        self.assertTrue(test_response.status_code == 400)
        self.assertTrue(test_response.json['description'] == "Username not found")

    def test_incorrect_password(self):
        test_response = self.loginUser(
            username=self.username,
            password="incorrect password",
        )
        self.assertFalse(test_response.status_code == 200)
        self.assertTrue(test_response.status_code == 400)
        self.assertTrue(test_response.json['description'] == "Password not found")

    def test_incorrect_username_and_password(self):
        test_response = self.loginUser(
            username="incorrect username",
            password="incorrect password",
        )
        self.assertFalse(test_response.status_code == 200)
        self.assertTrue(test_response.status_code == 400)
        self.assertTrue(test_response.json['description'] == "Username not found")

    def test_is_token_returned(self):
        test_response = self.loginUser(
            username=self.username,
            password=self.password,
        )
        access_token = test_response.json['access_token']
        refresh_token = test_response.json['refresh_token']
        self.assertTrue(access_token is not None)
        self.assertTrue(refresh_token is not None)

    def test_is_username_and_email_in_access_token(self):
        test_response = self.loginUser(
            username=self.username,
            password=self.password,
        )
        access_token = test_response.json['access_token']
        decoded_token = jwt.decode(access_token, options={"verify_signature": False})
        self.assertTrue(decoded_token['username'] == self.username)
        self.assertTrue(decoded_token['email'] == self.email)

    def test_does_access_token_work(self):
        test_response = self.loginUser(
            username=self.username,
            password=self.password,
        )
        access_token = test_response.json['access_token']
        response_to_protected_call = self.callProtectedRoute(
            access_token=access_token
        )
        self.assertTrue(response_to_protected_call.status_code == 200)

    def test_does_refresh_token_work(self):
        test_response = self.loginUser(
            username=self.username,
            password=self.password,
        )
        old_access_token = test_response.json['access_token']
        refresh_token = test_response.json['refresh_token']
        new_test_response = self.getAccessToken(refresh_token=refresh_token)
        new_access_token = new_test_response.json['access_token']
        self.assertFalse(old_access_token == new_access_token)
        response_to_protected_call = self.callProtectedRoute(
            access_token=new_access_token
        )
        self.assertTrue(response_to_protected_call.status_code == 200)

    def test_username_is_none(self):
        login_response = self.client.post(
            '/login',
            data=json.dumps(
                {
                    "password": self.password,
                }),
            content_type='application/json'
        )
        self.assertTrue(login_response.status_code == 400)
        self.assertTrue(login_response.json['description'] == "Username or Password not set")

    def test_password_is_none(self):
        login_response = self.client.post(
            '/login',
            data=json.dumps(
                {
                    "username": self.username,
                }),
            content_type='application/json'
        )
        self.assertTrue(login_response.status_code == 400)
        self.assertTrue(login_response.json['description'] == "Username or Password not set")