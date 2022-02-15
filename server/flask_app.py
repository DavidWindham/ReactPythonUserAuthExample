import os
from app import create_app, db
from app.auth.models import User
from flask_migrate import Migrate

app = create_app(os.getenv("FLASK_CONFIG") or "default")
migrate = Migrate(app, db)
from app import socketio


@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User)


if __name__ == "__main__":
    socketio.run(app)
