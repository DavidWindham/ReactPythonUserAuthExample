from auth_parent_class import AuthTestingParent


class ChangePasswordTestCase(AuthTestingParent):
    def setUp(self):
        super().setUp()
        self.username = 'password_change'
        self.password = 'password'
        self.email = 'pass@word.com'
        self.nickname = 'nick'

    def resetCurrentUser(self):
        register_user_response = self.registerUser(
            username=self.username,
            password=self.password,
            email=self.email,
            nickname=self.nickname
        )

        self.access_token = register_user_response.json['access_token']

    def test_change_password(self):
        self.resetCurrentUser()
        change_password_response = self.postRequestAuthenticated(
            url='/change_password',
            data={'oldPassword': 'password', 'newPassword': 'new_password'},
            access_token=self.access_token
        )
        self.assertTrue(change_password_response.status_code == 200)
        self.assertTrue(change_password_response.json['status'] == "password change successful")
        changed_pass_login_response = self.loginUser(username='password_change', password='new_password')
        self.assertTrue(changed_pass_login_response.status_code == 200)
        self.assertTrue('access_token' in changed_pass_login_response.json)

    def test_change_use_original_password(self):
        self.resetCurrentUser()
        self.postRequestAuthenticated(
            url='/change_password',
            data={'oldPassword': 'password', 'newPassword': 'new_password'},
            access_token=self.access_token
        )
        changed_pass_login_response = self.loginUser(username='password_change', password='password')
        self.assertFalse(changed_pass_login_response.status_code == 200)
        self.assertFalse('access_token' in changed_pass_login_response.json)

    def test_missing_old_password(self):
        self.resetCurrentUser()
        old_password_blank_response = self.postRequestAuthenticated(
            url='/change_password',
            data={'oldPassword': '', 'newPassword': 'new_password'},
            access_token=self.access_token
        )
        self.assertTrue(old_password_blank_response.status_code == 400)
        self.assertTrue(old_password_blank_response.json['description'] == "Old password is not set")

        old_password_missing_response = self.postRequestAuthenticated(
            url='/change_password',
            data={'newPassword': 'new_password'},
            access_token=self.access_token
        )
        self.assertTrue(old_password_missing_response.status_code == 400)
        self.assertTrue(old_password_missing_response.json['description'] == "Old password is not set")

    def test_missing_new_password(self):
        self.resetCurrentUser()
        new_password_blank_response = self.postRequestAuthenticated(
            url='/change_password',
            data={'oldPassword': 'password', 'newPassword': ''},
            access_token=self.access_token
        )
        self.assertTrue(new_password_blank_response.status_code == 400)
        self.assertTrue(new_password_blank_response.json['description'] == "New password is not set")

        new_password_missing_response = self.postRequestAuthenticated(
            url='/change_password',
            data={'oldPassword': 'password'},
            access_token=self.access_token
        )
        self.assertTrue(new_password_missing_response.status_code == 400)
        self.assertTrue(new_password_missing_response.json['description'] == "New password is not set")

    def test_incorrect_old_password(self):
        self.resetCurrentUser()
        incorrect_old_password_response = self.postRequestAuthenticated(
            url='/change_password',
            data={'oldPassword': 'incorrect', 'newPassword': 'new_password'},
            access_token=self.access_token
        )
        self.assertTrue(incorrect_old_password_response.status_code == 400)
        self.assertTrue(incorrect_old_password_response.json['description'] == "Incorrect old password")
