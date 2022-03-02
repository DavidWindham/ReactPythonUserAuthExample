from auth_parent_class import AuthTestingParent
import jwt


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
        response_to_test = self.loginUser(
            username=self.username,
            password=self.password,
        )
        self.assertTrue(response_to_test.status_code, 200)

    def test_incorrect_username(self):
        response_to_test = self.loginUser(
            username="incorrect username",
            password=self.password,
        )
        self.assertFalse(response_to_test.status_code == 200)
        self.assertTrue(response_to_test.status_code == 400)

    def test_incorrect_password(self):
        response_to_test = self.loginUser(
            username=self.username,
            password="incorrect password",
        )
        self.assertFalse(response_to_test.status_code == 200)
        self.assertTrue(response_to_test.status_code == 400)

    def test_incorrect_username_and_password(self):
        response_to_test = self.loginUser(
            username="incorrect username",
            password="incorrect password",
        )
        self.assertFalse(response_to_test.status_code == 200)
        self.assertTrue(response_to_test.status_code == 400)

    def test_is_token_returned(self):
        response_to_test = self.loginUser(
            username=self.username,
            password=self.password,
        )
        access_token = response_to_test.json['access_token']
        refresh_token = response_to_test.json['refresh_token']
        self.assertTrue(access_token is not None)
        self.assertTrue(refresh_token is not None)

    def test_is_username_and_email_in_access_token(self):
        response_to_test = self.loginUser(
            username=self.username,
            password=self.password,
        )
        access_token = response_to_test.json['access_token']
        decoded_token = jwt.decode(access_token, options={"verify_signature": False})
        self.assertTrue(decoded_token['username'] == self.username)
        self.assertTrue(decoded_token['email'] == self.email)

    def test_does_access_token_work(self):
        response_to_test = self.loginUser(
            username=self.username,
            password=self.password,
        )
        access_token = response_to_test.json['access_token']
        response_to_protected_call = self.callProtectedRoute(
            access_token=access_token
        )
        self.assertTrue(response_to_protected_call.status_code == 200)

    def test_does_refresh_token_work(self):
        response_to_test = self.loginUser(
            username=self.username,
            password=self.password,
        )
        old_access_token = response_to_test.json['access_token']
        refresh_token = response_to_test.json['refresh_token']
        new_response_to_test = self.getAccessToken(refresh_token=refresh_token)
        new_access_token = new_response_to_test.json['access_token']
        self.assertFalse(old_access_token == new_access_token)
        response_to_protected_call = self.callProtectedRoute(
            access_token=new_access_token
        )
        self.assertTrue(response_to_protected_call.status_code == 200)
