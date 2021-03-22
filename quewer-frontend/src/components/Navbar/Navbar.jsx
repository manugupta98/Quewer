import React, { Component } from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import store from '../../Redux/store';
import { toggleSideBar } from '../../Redux/actions';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    }
  }

  handleClick = () => {
    store.dispatch(toggleSideBar(this.state.isOpen));
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
        <div className="navbar">
          <FaBars style={{ marginRight: '20px', fontSize: '20px', cursor: 'pointer' }} onClick={this.handleClick} value={this.props.isOpen} />
          <h2 className="appbarTitle">
            Que<span className="colorText">wer</span>
          </h2>
          <div className='user-nav'>
            <p className="userName">{this.props.username}</p>
            <img src={this.props.image} alt="Avatar" className="avatar"></img>
          </div>
        </div>
    );
  }
}

export default Navbar;
