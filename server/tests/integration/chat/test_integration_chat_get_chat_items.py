from chat_parent_class import ChatTestingParent


class GetChatItemsTestCase(ChatTestingParent):
    def test_get_messages(self):
        test_response = self.getRequest(
            '/get_chat_items'
        )
        self.assertTrue(test_response.status_code == 200)

    def test_message_consistency(self):
        self.clearDB()
        message = {
            "message": "Test Message"
        }
        self.postJSONRequest("/submit_chat_item", message)

        messages = self.getRequest(
            url='/get_chat_items',
        ).json
        self.assertTrue(messages[0]['id'] == 1)
        self.assertTrue(messages[0]['message'] == "Test Message")
        self.assertTrue(messages[0]['username'] == "test_username")

    def test_get_no_messages(self):
        self.clearDB()
        messages = self.getRequest(
            '/get_chat_items'
        ).json
        self.assertTrue(len(messages) == 0)

    def test_get_three_messages(self):
        self.clearDB()
        for i in range(3):
            message = {
                "message": "Test Message"
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.getRequest(
            '/get_chat_items'
        ).json
        self.assertTrue(len(messages) == 3)

    def test_get_five_messages(self):
        self.clearDB()
        for i in range(5):
            message = {
                "message": "Test Message"
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.getRequest(
            '/get_chat_items'
        ).json
        self.assertTrue(len(messages) == 5)

    def test_get_five_messages_with_more_than_five_in_db(self):
        self.clearDB()
        for i in range(30):
            message = {
                "message": "Test Message"
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.getRequest(
            '/get_chat_items'
        ).json
        self.assertTrue(len(messages) == 5)

    def test_correct_five_messages_returned(self):
        self.clearDB()
        for i in range(5):
            message = {
                "message": str(i)
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.getRequest(
            '/get_chat_items'
        ).json
        self.assertTrue(len(messages) == 5)

    def test_get_chat_items_order(self):
        self.clearDB()
        for i in range(5):
            message = {
                "message": str(i)
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.getRequest(
            '/get_chat_items'
        ).json

        for idx in range(len(messages) - 1):
            self.assertTrue(messages[idx]['id'] > messages[idx + 1]['id'])
