import unittest
from app import create_app, db
import json
from app.chat.models import ChatItem
from app.auth.models import User
import datetime
from sqlalchemy.exc import IntegrityError, StatementError


class ChatModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_chat_item(self):
        chat_item_testing = ChatItem()
        self.assertTrue(chat_item_testing)

    def test_chat_item_message(self):
        chat_item_testing = ChatItem(message='This is a chat message test')
        self.assertTrue(chat_item_testing.message == 'This is a chat message test')

    def test_no_message(self):
        chat_item_testing = ChatItem()
        db.session.add(chat_item_testing)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_short_message(self):
        chat_item_testing = ChatItem(message='A')
        self.assertTrue(chat_item_testing.message == 'A')

    def test_long_message(self):
        chat_item_testing = ChatItem(
            message='This is a chat message test. This is a chat message test. This is a chat message test. '
                    'This is a chat message test. This is a chat message test. This is a chat message test. '
                    'This is a chat message test. This is a chat message test. This is a chat message test. '
                    'This is a chat message test. This is a chat message test. This is a chat message test. '
                    'This is a chat message test. This is a chat message test. This is a chat message test. '
                    'This is a chat message test. This is a chat message test. This is a chat message test. '
                    'This is a chat message test. This is a chat message test. This is a chat message test. '
        )
        self.assertTrue(chat_item_testing.message is not None)

    def test_message_timestamp(self):
        date_time_now = datetime.datetime.now()
        chat_message_time = ChatItem(timestamp=date_time_now)
        self.assertTrue(chat_message_time.timestamp == date_time_now)

    def test_user_assoc(self):
        assoc_user = User(username='assoc', password='assoc', email='e@mail.com')
        db.session.add(assoc_user)
        db.session.commit()
        self.assertTrue(assoc_user.id is not None)

        date_time_now = datetime.datetime.now()
        chat_item_assoc = ChatItem(
            message='test message',
            user_id=assoc_user.id,
            user=assoc_user,
            timestamp=date_time_now
        )
        db.session.add(chat_item_assoc)
        db.session.commit()

        self.assertTrue(chat_item_assoc.id is not None)
        self.assertTrue(chat_item_assoc.user_id == assoc_user.id)
        self.assertTrue(chat_item_assoc.user.username == 'assoc')

    def test_required(self):
        required_user = User(username='required', password='req', email='re@quired.com')
        db.session.add(required_user)
        db.session.commit()

        timestamp = datetime.datetime.now()
        chat_item_required_pass = ChatItem(
            message='required',
            timestamp=timestamp,
            user=required_user,
            user_id=required_user.id
        )
        db.session.add(chat_item_required_pass)
        self.assertTrue(IntegrityError, db.session.commit)

        chat_item_required_fail = ChatItem(
            message='required',
            user=required_user,
            user_id=required_user.id
        )
        db.session.add(chat_item_required_fail)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_no_user(self):
        timestamp = datetime.datetime.now()
        chat_item_no_user = ChatItem(
            message='required',
            timestamp=timestamp,
        )

        db.session.add(chat_item_no_user)
        # TODO: Add required flag for user in auth model
        # self.assertRaises(IntegrityError, db.session.commit)

    def test_string_for_timestamp(self):
        timestamp = 'not a timestamp'
        chat_item = ChatItem(
            message='required',
            timestamp=timestamp
        )
        db.session.add(chat_item)
        self.assertRaises(StatementError, db.session.commit)

    def test_serialize(self):
        serialize_user = User(username='serialize_user', password='ser', email='ser@ialize.com')
        db.session.add(serialize_user)
        db.session.commit()

        timestamp = datetime.datetime.now()
        chat_item = ChatItem(
            message='serialize',
            timestamp=timestamp,
            user=serialize_user,
            user_id=serialize_user.id
        )
        db.session.add(chat_item)
        db.session.commit()

        self.assertTrue("id" in chat_item.serialize())
        self.assertTrue("username" in chat_item.serialize())
        self.assertTrue("message" in chat_item.serialize())
        self.assertTrue("timestamp" in chat_item.serialize())
        self.assertFalse("user_id" in chat_item.serialize())
        self.assertTrue(chat_item.serialize()["message"] == 'serialize')
        self.assertTrue(chat_item.serialize()["timestamp"] == timestamp)
        self.assertTrue(chat_item.serialize()["username"] == 'serialize_user')
