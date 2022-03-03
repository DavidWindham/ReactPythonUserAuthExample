from auth_parent_class import AuthTestingParent


class UserLogoutTestCase(AuthTestingParent):
    def test_is_token_blacklisted(self):
        register_response = self.registerUser(
            username="LogoutUsername",
            password="LogoutPassword",
            email="Log@Out.com",
            nickname="LogoutNick"
        )
        access_token = register_response.json['access_token']
        refresh_token = register_response.json['refresh_token']

        test_response = self.logoutUser(
            access_token=access_token,
            refresh_token=refresh_token
        )
        self.assertTrue(test_response.status_code == 200)
        self.assertTrue(test_response.json['status'] == "Token has been invalidated")
        self.assertFalse(test_response.json['status'] == "Garbled")

    def test_double_blacklist(self):
        register_response = self.registerUser(
            username="LogoutUsername",
            password="LogoutPassword",
            email="Log@Out.com",
            nickname="LogoutNick"
        )
        access_token = register_response.json['access_token']
        refresh_token = register_response.json['refresh_token']

        self.logoutUser(
            access_token=access_token,
            refresh_token=refresh_token
        )
        test_response = self.logoutUser(
            access_token=access_token,
            refresh_token=refresh_token
        )
        self.assertFalse(test_response.status_code == 200)
        self.assertTrue(test_response.json['description'] == "Token already blacklisted")

    def test_blacklist_with_invalid_token(self):
        register_response = self.registerUser(
            username="LogoutUsername",
            password="LogoutPassword",
            email="Log@Out.com",
            nickname="LogoutNick"
        )
        access_token = register_response.json['access_token']
        test_response = self.logoutUser(
            access_token=access_token,
            refresh_token="This is an invalid token"
        )
        # There's no check on if the refresh token is valid
        # self.assertFalse(test_response.status_code == 200)

    def test_has_blacklist_worked(self):
        register_response = self.registerUser(
            username="LogoutUsername",
            password="LogoutPassword",
            email="Log@Out.com",
            nickname="LogoutNick"
        )
        access_token = register_response.json['access_token']
        refresh_token = register_response.json['refresh_token']
        self.logoutUser(
            access_token=access_token,
            refresh_token=refresh_token
        )
        test_response = self.getAccessToken(refresh_token=refresh_token)
        self.assertFalse(test_response.status_code == 200)
        self.assertTrue(test_response.status_code == 400)

    def test_access_token_still_works_after_refresh_blacklist(self):
        register_response = self.registerUser(
            username="LogoutUsername",
            password="LogoutPassword",
            email="Log@Out.com",
            nickname="LogoutNick"
        )
        access_token = register_response.json['access_token']
        refresh_token = register_response.json['refresh_token']

        self.logoutUser(
            access_token=access_token,
            refresh_token=refresh_token
        )
        protected_response = self.callProtectedRoute(
            access_token=access_token
        )
        self.assertTrue(protected_response.status_code == 200)
