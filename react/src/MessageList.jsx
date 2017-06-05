import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(this._buildMessages)}
      </main>
    );
  }

  //loops through all messages
  _buildMessages = (msg) => {
      return (<Message type={msg.type} key={msg.key} username={msg.username} contents={msg.contents} color={msg.color}/>)
  }


}
export default MessageList;

