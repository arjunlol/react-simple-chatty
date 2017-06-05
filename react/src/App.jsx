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
      onlineCount: 0, //count of how many online users, overwritten on connection
      color: "" //user color
    };
  }

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
            //incoming message and notification both have the same outcome
          case "incomingNotification":
            //handles incoming notification
            const messages = this.state.messages.concat(data)
            this.setState({messages:messages})
            break;
          case "count":
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
    this.socket = ws; //make globally accessible
  }

  render() {
    return (
      <div>
        <NavBar count={this.state.onlineCount}/>
        <MessageList messages={this.state.messages} notification={this.state.notification} color={this.state.color}/>
        <ChatBar user={this.state.currentUser.name} cbMsg={this._userInput} cbUser={this._userChange}/>
      </div>
    );
  }

  //callback used when enter key pressed on chatbar message
  _userInput = (user, newMsg) => {
    this.socket.send(JSON.stringify({type: "postMessage" ,username: user, color:this.state.color, contents: newMsg}));
    if (user !== this.state.currentUser.name) //do user change callback if enter not pressed on user, but name still changed..
    this._userChange(user);
  }

  //callback used when enter pressed on chatbar user name
  _userChange = (newUser) => {
    const contents = `${this.state.currentUser.name} has changed their name to ${newUser}`
    const notif = {type: "postNotification", contents: contents}
    this.socket.send(JSON.stringify(notif));
    this.setState({currentUser: {name: newUser}})
  }

}
export default App;
