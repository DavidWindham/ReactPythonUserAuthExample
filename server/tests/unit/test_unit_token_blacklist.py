import unittest
from app.auth.models import RefreshTokenBlacklist
from app import create_app, db


class TokenBlacklistModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_blacklist_token(self):
        tok = RefreshTokenBlacklist()
        self.assertTrue(tok is not None)
        tok = RefreshTokenBlacklist(refresh_token='this is a test')
        self.assertTrue(tok.refresh_token == 'this is a test')

    def test_token_exists(self):
        tok = RefreshTokenBlacklist()
        self.assertFalse(tok.id is not None)
        db.session.add(tok)
        db.session.commit()
        self.assertTrue(tok.id is not None)
