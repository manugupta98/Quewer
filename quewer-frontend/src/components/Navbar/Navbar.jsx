import React, { Component } from "react";
import "./Navbar.css";
import avatarImage from "../../assets/avatar.png";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-light navbar-expand bg-light">
        <div class="container-fluid">
          <h2 className="appbarTitle">
            Que<span className="colorText">wer</span>
          </h2>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <p className="userName">{this.props.username}</p>
            </li>
            <li class="nav-item">
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
