# React app with Flask delivering JWT for user auth

Features:

* JWT implementation
* Automatic Access Token refresh with a wrapper for axios
* TokenStorage class to handle JWT's

## Installation

### Client

Run the following commands to install the client

```
npm install
```

Run with

```
npm start
```

### Server

Install pre-requisites with the following command

```
pip install -r requirements.txt
```

Use the following to setup the flask environment

```
export FLASK_APP=flask_app.py
export FLASK_CONFIG=development
export FLASK_DEBUG=1
```

Now, init the DB using the following

```
flask shell
from app import db
db.create_all()
```

Now the DB has been initialized, you can now run the webserver with the following

```
flask run --host=0.0.0.0 --port=5001
```

If you wish to change the port, you must also adjust the "proxy" field in the "client" part of this application, the proxy field is in the "package.json"

The API is now functional
