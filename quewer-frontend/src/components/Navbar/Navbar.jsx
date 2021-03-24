import React, { Component } from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import store from '../../Redux/store';
import { toggleSideBar } from '../../Redux/actions';
import { Link } from "react-router-dom";

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
          <Link to="/" className="appbarTitle">
            <h2 className="appbarTitle" style={{cursor: 'pointer'}}>
              Que<span className="colorText">wer</span>
            </h2>
          </Link>
          <div className='user-nav'>
            <p className="userName">{store.getState().user.user.name}</p>
            <img src={store.getState().user.user.profileImg} alt="Avatar" className="avatar"></img>
          </div>
        </div>
    );
  }
}

export default Navbar;
