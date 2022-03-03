from chat_parent_class import ChatTestingParent


class UpdateChatTestCase(ChatTestingParent):
    def test_get_messages(self):
        messages = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": []}
        )
        self.assertTrue(messages.status_code == 200)

    def test_message_consistency(self):
        self.clearDB()
        message = {
            "message": "Test Message"
        }
        self.postJSONRequest("/submit_chat_item", message)

        messages = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": []}
        ).json
        self.assertTrue(messages[0]['id'] == 1)
        self.assertTrue(messages[0]['message'] == "Test Message")
        self.assertTrue(messages[0]['username'] == "test_username")

    def test_get_three_messages_no_filter(self):
        self.clearDB()
        for i in range(3):
            message = {
                "message": "Test Message"
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": []}
        )
        self.assertTrue(messages.status_code == 200)

    def test_get_three_messages_with_filter(self):
        self.clearDB()
        for i in range(5):
            message = {
                "message": "Test Message"
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": [1, 2]}
        ).json
        self.assertTrue(len(messages) == 3)

    def test_get_one_with_many_in_db(self):
        self.clearDB()
        for i in range(30):
            message = {
                "message": "Test Message"
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": [29, 28, 27, 26]}
        ).json
        self.assertTrue(len(messages) == 1)

    def test_pass_string_as_args(self):
        self.assertRaises(
            AttributeError,
            self.postJSONRequest,
            url='/update_chat_items',
            data="Test"
        )

    def test_pass_int_as_args(self):
        self.assertRaises(
            AttributeError,
            self.postJSONRequest,
            url='/update_chat_items',
            data=5
        )

    def test_pass_array_of_strings_instead_of_ints(self):
        self.clearDB()
        for i in range(3):
            message = {
                "message": "Test Message"
            }
            self.postJSONRequest("/submit_chat_item", message)

        test_response = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": ["1", "2"]}
        )
        self.assertTrue(test_response.status_code)

    def test_pass_string_instead_of_array_in_id_array(self):
        test_response = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": "test"}
        )
        # Currently there's no check on the type of id_array
        self.assertTrue(test_response.status_code == 200)

    def test_pass_int_instead_of_array_in_id_array(self):
        test_response = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": 5}
        )
        # Currently there's no check on the type of id_array
        self.assertTrue(test_response.status_code == 200)

    def test_get_chat_items_order(self):
        self.clearDB()
        for i in range(5):
            message = {
                "message": str(i)
            }
            self.postJSONRequest("/submit_chat_item", message)

        messages = self.postJSONRequest(
            url='/update_chat_items',
            data={"id_array": []}
        ).json

        for idx in range(len(messages) - 1):
            self.assertTrue(messages[idx]['id'] > messages[idx + 1]['id'])
