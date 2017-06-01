import React, {Component} from 'react';

// let defaultState = {
//   username: this.props.user,
//   contents: ""
// }

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      contents: ""
    };
  }

  render() {

    console.log("Rendering <ChatBar/>");
    return (
      <div>
      <footer className="chatbar" onSubmit={this._submitMsg}>
        <input className="chatbar-username" placeholder={this.props.user}
        onChange={this._onUserChange}
        onKeyPress={this._submitUser}/>
        <input className="chatbar-message" value={this.state.contents}
        placeholder="Type a message and hit ENTER"
        onChange={this._onContentChange} onKeyPress={this._submitMsg}/>
      </footer>
      </div>
    );
  }

  _onUserChange = (e) => {
    this.setState({username: e.target.value})
  }


  _onContentChange = (e) => {
    this.setState({contents: e.target.value});
  }

  _submitMsg = (e) => {
    if (e.key === 'Enter') {
      this.props.cbMsg(this.state.username, this.state.contents);
      this.setState({contents: ""});
    }

  }

  _submitUser = (e) => {
    if (e.key === 'Enter') {
      this.props.cbUser(this.state.username);
    }
  }


}
export default ChatBar;
