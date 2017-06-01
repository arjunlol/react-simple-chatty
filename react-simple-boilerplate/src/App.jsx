import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [], // message coming from the server stored here
      onlineCount: 0,
      color: ""
    };
  }

  //called when first rendered, waits 3 secs then adds a new msg to the list of mesages
  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

  componentDidMount() {
    //initiate connection to WS server
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = (e) => {
      console.log("Connected to server");
    }
      const send = (message) => {
        ws.send(JSON.stringify(message));
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch(data['type']){
          case "incomingMessage":
            //handles incoming message

          case "incomingNotification":
            //handles incoming notification
            const messages = this.state.messages.concat(data)
            this.setState({messages:messages})
            // this.setState({notification: data.contents})
            console.log("notification just came boiii")
            break;
          case "count":
            console.log('The counter is ', data.counter)
            this.setState({onlineCount: data.counter});
            break;
          case "color":
            const name = this.state.currentUser.name;
            this.setState({color: data.color})
            break;
          default:
            //if unknown type
            throw new Error("Unknown event type" + data.type)
        }
      }
      // send("TEST")
    this.socket = ws;
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <NavBar count={this.state.onlineCount}/>
        <MessageList messages={this.state.messages} notification={this.state.notification} color={this.state.color}/>
        <ChatBar user={this.state.currentUser.name} cbMsg={this._userInput} cbUser={this._userChange}/>
      </div>
    );
  }

  _userInput = (user, newMsg) => {
    this.socket.send(JSON.stringify({type: "postMessage" ,username: user, color:this.state.color, contents: newMsg}));
    // const message = {key: this.state.messages.length +1, type: "incomingMessage", username: user, color:this.state.color, contents: newMsg}
    // console.log(message.contents);
    // const messages = this.state.messages.concat(message);
    if (user !== this.state.currentUser.name)
    this._userChange(user);
    // this.setState({messages: messages});
  }

  _userChange = (newUser) => {
    const contents = `${this.state.currentUser.name} has changed their name to ${newUser}`
    console.log(contents);
    const notif = {type: "postNotification", contents: contents}
    this.socket.send(JSON.stringify(notif));
    this.setState({currentUser: {name: newUser}})
  }

}
export default App;
