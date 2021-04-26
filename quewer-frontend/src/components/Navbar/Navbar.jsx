import React from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { toggleSideBar, userInfo } from '../../Redux/actions';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import store from "../../Redux/store";

import { Popover } from '@material-ui/core';
import ProfileAvatar from "./ProfileAvatar";

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  React.useEffect(() => {
    dispatch(userInfo());
  }, []);

  const handleClick = () => dispatch(toggleSideBar());

  return (
    <div className="navbar">
      <FaBars style={{ marginRight: '20px', fontSize: '20px', cursor: 'pointer' }} onClick={handleClick} />
      <Link to="/main" className="appbarTitle">
        <h2 className="appbarTitle" style={{ cursor: 'pointer' }}>
          Que<span className="colorText">wer</span>
        </h2>
      </Link>
      <div className='user-nav'>
        <p className="userName">{user.name}</p>
        <div>
          <ProfileAvatar profileImg={user.profileImg}/>
        </div>
      </div>
    </div>
  );
}
