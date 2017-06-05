React Chatty App
=====================
Chatty allows users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

### Final Product
!["Chat Screen"](https://github.com/arjunlol/React-Chatty-App/DOCS/Screenshot from 2017-06-05 00-07-27.png)
* When any connected user sends a chat message, all connected users receive and display the message
* When any connected user changes their name, all connected users are notified of the name change
* Notifications are styled differently from chat messages
* Header will display the count of connected users
* When the number of connected users changes, this count will be updated for all connected users
* Different users' names will each be coloured differently
* Colouring is consistent between connected user instances

### Usage
Install the dependencies/run both the websocket server and react server folders.

```
git clone https://github.com/arjunlol/React-Chatty-App
npm install react folder, and run npm start.
npm install ws server folder, and run npm start.
Open http://localhost:3000
```

### Linting

This project includes React ESLint configuration.

```
npm run lint
```

### React Server Dependencies

* react
* react-dom
* webpack
* webpack-dev-server
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* sass-loader
* sockjs-client
* style-loader

### WS Dependencies
* express
* uuid"
* ws