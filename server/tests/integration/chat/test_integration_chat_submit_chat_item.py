from chat_parent_class import ChatTestingParent


class SubmitChatTestCase(ChatTestingParent):
    def test_submit_chat_item(self):
        message = {
            "message": "Test Message"
        }
        response = self.postJSONRequest("/submit_chat_item", message)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(response.json['description'] == "success")

    def test_empty_chat_item(self):
        message = {
            "message": ""
        }
        response = self.postJSONRequest("/submit_chat_item", message)
        self.assertFalse(response.status_code == 200)
        self.assertTrue(response.status_code == 400)
        self.assertTrue(response.json['description'] == "Message is not set")

    def test_missing_chat_item(self):
        self.assertRaises(
            AttributeError,
            self.postJSONRequest,
            url="/submit_chat_item",
            data=None
        )
