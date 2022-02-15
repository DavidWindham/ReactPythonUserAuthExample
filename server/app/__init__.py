from flask import Flask
from config import app_config
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_socketio import SocketIO

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = "auth.login"
socketio = SocketIO()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])
    app_config[config_name].init_app(app)
    db.init_app(app)
    login_manager.init_app(app)

    from .auth import auth as auth_blueprint
    from .chat import chat as chat_blueprint

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(chat_blueprint)

    #   No socket logging
    # socketio.init_app(app, cors_allowed_origins="*")
    #   Basic socket connection logging
    socketio.init_app(app, cors_allowed_origins="*", logger=True)
    #   Verbose socket connection logging
    # socketio.init_app(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

    return app
