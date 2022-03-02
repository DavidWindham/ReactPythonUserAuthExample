import os
import sys
import click

from app import create_app, db
from app.auth.models import User
from flask_migrate import Migrate

app = create_app(os.getenv("FLASK_CONFIG") or "default")
migrate = Migrate(app, db)
from app import socketio

COV = None
if os.environ.get('FLASK_COVERAGE'):
    import coverage

    COV = coverage.coverage(branch=True, include='app/*')
    COV.start()


@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User)


@app.cli.command()
@click.option('--coverage/--no-coverage', default=False, help='Run tests under code coverage.')
def test(coverage):
    if coverage and not os.environ.get('FLASK_COVERAGE'):
        os.environ['FLASK_COVERAGE'] = '1'
        os.execvp(sys.executable, [sys.executable] + sys.argv)
    import unittest

    basic_tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(basic_tests)

    unit_tests = unittest.TestLoader().discover('tests/unit')
    unittest.TextTestRunner(verbosity=2).run(unit_tests)

    auth_integration_tests = unittest.TestLoader().discover('tests/integration/auth')
    unittest.TextTestRunner(verbosity=2).run(auth_integration_tests)

    chat_integration_tests = unittest.TestLoader().discover('tests/integration/chat')
    unittest.TextTestRunner(verbosity=2).run(chat_integration_tests)

    if COV:
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, 'tmp/coverage')
        COV.html_report(directory=covdir)
        print('HTML version: file://%s/index.html' % covdir)
        COV.erase()


if __name__ == "__main__":
    socketio.run(app)
