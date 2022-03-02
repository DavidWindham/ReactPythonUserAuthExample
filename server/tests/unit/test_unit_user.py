import unittest
from app.auth.models import User
import jwt
from app import create_app, db


class UserModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_password_setter(self):
        u = User(password='test_pass')
        self.assertTrue(u.password_hash is not None)

    def test_no_password_getter(self):
        u = User(password='test')
        with self.assertRaises(AttributeError):
            u.password

    def test_password_validation(self):
        u = User(password='test')
        self.assertTrue(u.validate_password('test'))
        self.assertFalse(u.validate_password('not_pass'))

    def test_password_salts_are_randomized(self):
        u = User(password='test')
        u2 = User(password='test')
        self.assertTrue(u.password_hash != u2.password_hash)

    def test_auth_token_generation(self):
        u = User(username='token_test', password='test')
        generated_token = u.generate_auth_token()
        self.assertTrue(generated_token != None)
        decoded_token = jwt.decode(generated_token, options={"verify_signature": False})
        self.assertTrue(decoded_token['username'] == 'token_test')

    def test_verify_auth_token(self):
        u = User(username='token_test', password='test')
        generated_token = u.generate_auth_token()
        verify_status = u.verify_auth_token(generated_token)
        self.assertTrue(verify_status)
        verify_status = u.verify_auth_token('not a token')
        self.assertFalse(verify_status)

        decoded_token = jwt.decode(generated_token, options={"verify_signature": False})
        re_encoded_token = jwt.encode(decoded_token, key='', algorithm="HS512")
        verify_recoded_token = u.verify_auth_token(re_encoded_token)
        self.assertFalse(verify_recoded_token)
