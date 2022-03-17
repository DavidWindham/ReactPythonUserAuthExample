from .. import db


class ChatItem(db.Model):
    __tablename__ = 'chat_item'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Foreign key to user
    user = db.relationship("User")

    message = db.Column(db.String(256), nullable=False)
    timestamp = db.Column(db.DATETIME, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user.username,
            "message": self.message,
            "timestamp": self.timestamp,
        }
