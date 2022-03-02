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

        response_to_test = self.logoutUser(
            access_token=access_token,
            refresh_token=refresh_token
        )
        self.assertTrue(response_to_test.status_code == 200)
        self.assertTrue(response_to_test.json['status'] == "Token has been invalidated")
        self.assertFalse(response_to_test.json['status'] == "Garbled")

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
        response_to_test = self.logoutUser(
            access_token=access_token,
            refresh_token=refresh_token
        )
        self.assertFalse(response_to_test.status_code == 200)

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
        response_to_test = self.getAccessToken(refresh_token=refresh_token)
        self.assertFalse(response_to_test.status_code == 200)
        self.assertTrue(response_to_test.status_code == 400)

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
