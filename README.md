# React app with Flask delivering JWT for user auth

Features:

* JWT implementation
* Automatic Access Token refresh with a wrapper for axios
* TokenStorage class to handle JWT's
* State Containers with Redux for frontend functionality
* Basic animation with react-transition-group
* Moved to Typescript implementation, Javascript version is now depreciated in this repo

## Installation

### Client

To install the client, cd into the "client" folder from the main directory and run the following command

```
npm install
```

Run with

```
npm start
```

### Server

To install the server, cd into the "server" folder from the main directory and complete the following steps below

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

Now, init the DB using the following (migrations and flask env are already part of the repo)

```
flask shell
from app import db
db.create_all()
# then press ctrl+D to exit the InteractiveConsole
```

Now the DB has been initialized, you can now run the webserver with the following

```
flask run --host=0.0.0.0 --port=5000
```

If you wish to change the port, you must also adjust the "proxy" field in the "client" part of this application, the proxy field is in the "package.json"

The API is now functional
