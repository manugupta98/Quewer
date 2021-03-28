import React from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { toggleSideBar, userInfo } from '../../Redux/actions';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

export default function NavBar() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  if (user.name === null) dispatch(userInfo());

  const handleClick = () => dispatch(toggleSideBar());

  return (
    <div className="navbar">
      <FaBars style={{ marginRight: '20px', fontSize: '20px', cursor: 'pointer' }} onClick={handleClick} />
      <Link to="/" className="appbarTitle">
        <h2 className="appbarTitle" style={{ cursor: 'pointer' }}>
          Que<span className="colorText">wer</span>
        </h2>
      </Link>
      <div className='user-nav'>
        <p className="userName">{user.name}</p>
        <img src={user.profileImg} alt="Avatar" className="avatar"></img>
      </div>
    </div>
  );
}
