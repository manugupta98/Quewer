import React, { Component } from "react";
import "./Navbar.css";
import avatarImage from "../../assets/avatar.png";

class Navbar extends Component {
  render() {
    return (
        <div className="navbar">
          <h2 className="appbarTitle">
            Que<span className="colorText">wer</span>
          </h2>
          <div className='user-nav'>
            <p className="userName">{this.props.username}</p>
            <img src={avatarImage} alt="Avatar" className="avatar"></img>
          </div>
        </div>
    );
  }
}

export default Navbar;
