from auth_parent_class import AuthTestingParent
import jwt


class RefreshTokenTestCase(AuthTestingParent):
    def test_valid_refresh_token(self):
        register_response = self.registerUser(
            username="register username",
            password="register password",
            email="reg@ister.com",
            nickname="reg"
        )
        refresh_token = register_response.json['refresh_token']
        test_response = self.getAccessToken(refresh_token=refresh_token)
        self.assertTrue(test_response.status_code == 200)
        self.assertTrue(test_response.json['access_token'] is not None)

    def test_invalid_refresh_token(self):
        test_encoded_token = jwt.encode({"username": "test"}, key='', algorithm="HS512")
        test_response = self.getAccessToken(refresh_token=test_encoded_token)
        self.assertTrue(test_response.status_code == 400)
        self.assertTrue(test_response.json['description'] == "Token refresh error")

    def test_blacklisted_refresh_token(self):
        register_response = self.registerUser(
            username="register username",
            password="register password",
            email="reg@ister.com",
            nickname="reg"
        )
        access_token = register_response.json['access_token']
        refresh_token = register_response.json['refresh_token']
        self.logoutUser(access_token=access_token, refresh_token=refresh_token)
        test_response = self.getAccessToken(refresh_token=refresh_token)
        self.assertTrue(test_response.status_code == 400)
        self.assertTrue(test_response.json['description'] == "Token is blacklisted")

    def test_expired_refresh_token(self):
        # This cannot be done with the current structure
        # TODO: put the token expiry times in environment variables
        pass
