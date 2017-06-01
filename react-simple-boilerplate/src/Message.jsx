import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    // const color = "color:" + {this.props.color} + ";"
    if(this.props.type === "incomingMessage") {
      return (

          <div className="message">
            <span className="message-username" style={{'color':this.props.color}} >{this.props.username}</span>
            <span className="message-content" dangerouslySetInnerHTML={{__html:this.props.contents}}></span>
          </div>
      );
    } else {
      return (
        <div className="message system">
          {this.props.contents}
        </div>
      );
    }
  }
}
export default Message;

