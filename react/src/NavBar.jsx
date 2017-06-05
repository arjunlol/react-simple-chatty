import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar/>");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="count">
          <p>{this.props.count} users online</p>
        </div>
      </nav>
    );
  }
}
export default NavBar;

