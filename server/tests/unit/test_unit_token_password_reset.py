import unittest
from app.auth.models import ForgotPasswordToken, User
from app import create_app, db
import datetime
from sqlalchemy.exc import IntegrityError


class TokenPasswordResetModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

        self.usable_user = User(username='password_test', email='pass@word.com', password='password')
        db.session.add(self.usable_user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_blacklist_token(self):
        tok = ForgotPasswordToken()
        self.assertTrue(tok is not None)
        tok = ForgotPasswordToken(token='this is a test')
        self.assertTrue(tok.token == 'this is a test')

    def test_token_exists(self):
        test_datetime = datetime.datetime.now()
        tok = ForgotPasswordToken(token='', expiry_date_time=test_datetime, user_id=self.usable_user.id)
        self.assertFalse(tok.id is not None)
        db.session.add(tok)
        db.session.commit()
        self.assertTrue(tok.id is not None)

    def test_missing_token(self):
        test_expiry = datetime.datetime.now()
        tok = ForgotPasswordToken(expiry_date_time=test_expiry, user_id=self.usable_user.id)
        db.session.add(tok)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_missing_time(self):
        tok = ForgotPasswordToken(token='not_null', user_id=self.usable_user.id)
        db.session.add(tok)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_missing_user_id(self):
        test_expiry = datetime.datetime.now()
        tok = ForgotPasswordToken(token='not_null', expiry_date_time=test_expiry)
        db.session.add(tok)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_complete_token(self):
        test_expiry = datetime.datetime.now()
        tok = ForgotPasswordToken(token='not_null', expiry_date_time=test_expiry, user_id=self.usable_user.id)
        db.session.add(tok)
        print("About to test complete")
        self.assertTrue(db.session.commit)
        print(db.session.commit())

    def test_user_assoc(self):
        user = User(username="assoc", email="as@soc.com", password='assoc')
        db.session.add(user)
        db.session.commit()
        test_datetime = datetime.datetime.now()
        tok = ForgotPasswordToken(token='test', expiry_date_time=test_datetime, user_id=user.id)
        db.session.add(tok)
        db.session.commit()
        self.assertTrue(tok.user.username == 'assoc')
