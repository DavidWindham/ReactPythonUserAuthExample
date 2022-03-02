# React app with Flask delivering JWT for user auth

Features:

* JWT implementation
* Automatic Access Token refresh with a wrapper for [axios](https://github.com/axios/axios)
* TokenStorage class to handle JWT's
* State Containers with Redux for frontend functionality
* Basic animation with [react-transition-group](https://github.com/reactjs/react-transition-group)
* Moved to Typescript implementation, Javascript version is now depreciated in this repo
* Persistent state with [redux-persist](https://github.com/rt2zz/redux-persist)
* Shared state across multiple tabs with [redux-state-sync](https://github.com/aohua/redux-state-sync)
* Websocket implementation with [SocketIO](https://github.com/socketio/socket.io) using a chat for an example
  * No auth implementation on Websocket
  * Socket broadcasts trigger an API call that ensures authentication
* Backend testing

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
export FLASK_CONFIG=development   # or 'production' to setup production db
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
python flask_app.py
```

If you wish to change the port (found in flask_app.py), you must also adjust the "proxy" field in the "client" part of this application, the proxy field is in the "package.json"

The API is now functional

#### Testing
To run unit tests and integration tests for the API, run the following commands in the "server" folder

```
export FLASK_APP=flask_app.py
flask test --coverage
```
