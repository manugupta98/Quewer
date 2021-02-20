import React, { Component } from "react";
import "./Navbar.css";
import avatarImage from "../../assets/avatar.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light navbar-expand bg-light">
        <div className="container-fluid">
          <h2 className="appbarTitle">
            Que<span className="colorText">wer</span>
          </h2>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <p className="userName">{this.props.username}</p>
            </li>
            <li className="nav-item">
              <a href="#">
                <img src={avatarImage} alt="Avatar" class="avatar"></img>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
