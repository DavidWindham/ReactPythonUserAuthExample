from auth_parent_class import AuthTestingParent
import jwt
from sqlalchemy.exc import IntegrityError


class UserRegistrationTestCase(AuthTestingParent):
    def test_register_user(self):
        response_to_test = self.registerUser(
            username='username',
            password='password',
            email='email@email.com',
            nickname='nickname'
        )
        self.assertTrue(response_to_test.status_code, 200)

        access_token = response_to_test.json['access_token']
        refresh_token = response_to_test.json['refresh_token']
        self.assertTrue(access_token is not None)
        self.assertTrue(refresh_token is not None)

        decoded_token = jwt.decode(refresh_token, options={"verify_signature": False})
        self.assertTrue(decoded_token['username'] == 'username')

    def test_register_two_identical_usernames(self):
        user_one_test = self.registerUser(
            username='same_username',
            password='user_one_password',
            email='user_one@test.com',
            nickname='uone'
        )
        self.assertTrue(user_one_test.status_code == 200)

        self.assertRaises(
            IntegrityError,
            self.registerUser,
            username='same_username',
            password='user_two_password',
            email='user_two@test.com',
            nickname='utwo'
        )

    def test_register_two_identical_emails(self):
        user_one_test = self.registerUser(
            username='user_one',
            password='user_one_password',
            email='same@email.com',
            nickname='uone'
        )
        self.assertTrue(user_one_test.status_code == 200)

        self.assertRaises(
            IntegrityError,
            self.registerUser,
            username='user_two',
            password='user_two_password',
            email='same@email.com',
            nickname='utwo'
        )

    def test_register_two_identical_nicknames(self):
        user_one_test = self.registerUser(
            username='user_one',
            password='user_one_password',
            email='user@one.com',
            nickname='same_nickname'
        )
        self.assertTrue(user_one_test.status_code == 200)

        user_one_test = self.registerUser(
            username='user_two',
            password='user_two_password',
            email='user@two.com',
            nickname='same_nickname'
        )
        self.assertTrue(user_one_test.status_code == 200)

    def test_register_two_identical_passwords(self):
        user_one_test = self.registerUser(
            username='user_one',
            password='same_password',
            email='user@one.com',
            nickname='uone'
        )
        self.assertTrue(user_one_test.status_code == 200)

        user_one_test = self.registerUser(
            username='user_two',
            password='same_password',
            email='user@two.com',
            nickname='utwo'
        )
        self.assertTrue(user_one_test.status_code == 200)

    def test_are_tokens_set_and_does_refresh_work(self):
        user_token_test = self.registerUser(
            username='user_token',
            password='password',
            email='user@token.com',
            nickname='utok'
        )

        initial_access_token = user_token_test.json['access_token']
        refresh_token = user_token_test.json['refresh_token']
        self.assertTrue(initial_access_token is not None)
        self.assertTrue(refresh_token is not None)

        # Ensures access token from registration is valid
        verify_initial_access_token_call = self.callProtectedRoute(initial_access_token)
        self.assertTrue(verify_initial_access_token_call.status_code == 200)

        # Refreshes the token
        refreshed_access_token_call = self.getAccessToken(refresh_token)
        self.assertTrue(refreshed_access_token_call.status_code == 200)
        refreshed_access_token = refreshed_access_token_call.json['access_token']
        # And ensures it's valid
        verify_refreshed_access_token_call = self.callProtectedRoute(refreshed_access_token)
        self.assertTrue(verify_refreshed_access_token_call.status_code == 200)

        # Finally makes sure both access tokens aren't the same
        self.assertTrue(initial_access_token != refreshed_access_token)

    def test_is_username_and_email_in_token(self):
        user_token_test = self.registerUser(
            username='user_token',
            password='password',
            email='user@token.com',
            nickname='utok'
        )
        access_token = user_token_test.json['access_token']

        decoded_token = jwt.decode(access_token, options={"verify_signature": False})
        self.assertTrue("username" in decoded_token)
        self.assertTrue("email" in decoded_token)
        self.assertTrue(decoded_token["username"] == "user_token")
        self.assertTrue(decoded_token["email"] == "user@token.com")