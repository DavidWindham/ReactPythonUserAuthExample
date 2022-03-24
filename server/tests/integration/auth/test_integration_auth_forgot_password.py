from auth_parent_class import AuthTestingParent


class ForgotPasswordTestCase(AuthTestingParent):
    def setUp(self):
        super().setUp()
        self.username = 'password_forgot'
        self.password = 'password'
        self.email = 'pass@word.com'
        self.nickname = 'nick'
        self.resetCurrentUser()

    def resetCurrentUser(self):
        self.wipeDB()
        register_user_response = self.registerUser(
            username=self.username,
            password=self.password,
            email=self.email,
            nickname=self.nickname
        )

        # self.access_token = register_user_response.json['access_token']

    def get_reset_token(self):
        token_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': self.username, 'email': self.email}
        )
        self.reset_token = token_response.json['token']

    def test_forgot_password_request(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': self.username, 'email': self.email}
        )
        self.assertTrue(forgot_change_request_response.status_code == 200)
        self.assertTrue(forgot_change_request_response.json['status'] == "forgot token sent")
        self.assertTrue('token' in forgot_change_request_response.json)

    def test_request_email_is_none(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': self.username}
        )
        self.assertTrue(forgot_change_request_response.status_code == 200)
        self.assertTrue(forgot_change_request_response.json['status'] == "forgot token sent")
        self.assertTrue('token' in forgot_change_request_response.json)

    def test_request_username_is_none(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'email': self.email}
        )
        self.assertTrue(forgot_change_request_response.status_code == 200)
        self.assertTrue(forgot_change_request_response.json['status'] == "forgot token sent")
        self.assertTrue('token' in forgot_change_request_response.json)

    def test_request_email_is_blank(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': self.username, 'email': ""}
        )
        self.assertTrue(forgot_change_request_response.status_code == 200)
        self.assertTrue(forgot_change_request_response.json['status'] == "forgot token sent")
        self.assertTrue('token' in forgot_change_request_response.json)

    def test_request_username_is_blank(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': "", 'email': self.email}
        )
        self.assertTrue(forgot_change_request_response.status_code == 200)
        self.assertTrue(forgot_change_request_response.json['status'] == "forgot token sent")
        self.assertTrue('token' in forgot_change_request_response.json)

    def test_request_username_and_email_are_none(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={}
        )
        self.assertTrue(forgot_change_request_response.status_code == 400)
        self.assertTrue(forgot_change_request_response.json['description'] == "Neither email nor username are set")
        self.assertFalse('token' in forgot_change_request_response.json)

    def test_request_username_and_email_are_blank(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': "", 'email': ""}
        )
        self.assertTrue(forgot_change_request_response.status_code == 400)
        self.assertTrue(forgot_change_request_response.json['description'] == "Neither email nor username are set")
        self.assertFalse('token' in forgot_change_request_response.json)

    def test_request_unknown_user(self):
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': 'test_unknown', 'email': 'un@known.com'}
        )
        self.assertTrue(forgot_change_request_response.status_code == 400)
        self.assertTrue(forgot_change_request_response.json['description'] == "User is not found")
        self.assertFalse('token' in forgot_change_request_response.json)

    def test_token_returned(self):
        self.resetCurrentUser()
        forgot_change_request_response = self.postRequest(
            url='/forgot_password_request',
            data={'username': self.username, 'email': self.email}
        )
        reset_token = forgot_change_request_response.json['token']

        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'email': self.email,
                'resetToken': reset_token,
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 200)
        self.assertTrue(forgot_change_response.json['status'] == "Password changed")

    def test_change_token_arg_is_none(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'email': self.email,
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 400)
        self.assertTrue(forgot_change_response.json['description'] == "Token is invalid")

    def test_change_token_arg_is_blank(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'resetToken': '',
                'email': self.email,
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 400)
        self.assertTrue(forgot_change_response.json['description'] == "Token is invalid")

    def test_change_a_token_that_has_been_used(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'resetToken': self.reset_token,
                'email': self.email,
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 200)
        self.assertTrue(forgot_change_response.json['status'] == "Password changed")
        forgot_change_response_with_reused_token = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'resetToken': self.reset_token,
                'email': self.email,
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response_with_reused_token.status_code == 400)
        self.assertTrue(forgot_change_response_with_reused_token.json['description'] == "Token has been used")

    def test_change_different_username_but_with_valid_email(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': 'different',
                'resetToken': self.reset_token,
                'email': self.email,
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 200)
        self.assertTrue(forgot_change_response.json['status'] == "Password changed")

    def test_change_non_existent_user_but_with_valid_email(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'resetToken': self.reset_token,
                'email': "non@exist.com",
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 400)
        self.assertTrue(forgot_change_response.json['description'] == "User credentials are invalid")

    def test_change_incorrect_email_but_with_valid_username(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'resetToken': self.reset_token,
                'email': 'in@correct.com',
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 200)

    def test_change_incorrect_username_but_with_valid_email(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': 'incorrect',
                'resetToken': self.reset_token,
                'email': self.email,
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 200)

    def test_change_incorrect_email_and_username(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': 'incorrect',
                'resetToken': self.reset_token,
                'email': 'in@correct.com',
                'newPassword': 'new password'
            }
        )
        self.assertTrue(forgot_change_response.status_code == 400)

    def test_new_password_is_none(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'resetToken': self.reset_token,
                'email': self.email,
            }
        )
        self.assertTrue(forgot_change_response.status_code == 400)
        self.assertTrue(forgot_change_response.json['description'] == 'New password is invalid')

    def test_new_password_is_blank(self):
        self.get_reset_token()
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'resetToken': self.reset_token,
                'email': self.email,
                'newPassword': ''
            }
        )
        self.assertTrue(forgot_change_response.status_code == 400)
        self.assertTrue(forgot_change_response.json['description'] == 'New password is invalid')

    def test_change_password_is_successful(self):
        # New password works with login
        self.resetCurrentUser()
        self.get_reset_token()
        new_password = "successful password change"
        forgot_change_response = self.postRequest(
            url='/forgot_password_change',
            data={
                'username': self.username,
                'resetToken': self.reset_token,
                'email': self.email,
                'newPassword': new_password
            }
        )
        login_response = self.loginUser(username=self.username, password=new_password)
        self.assertTrue(login_response.status_code == 200)
        self.assertTrue('access_token' in login_response.json)
        self.assertTrue('refresh_token' in login_response.json)

    # # def test_token_is_expired(self):
    # # Not possible with current configuration
