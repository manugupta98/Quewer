import React from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { toggleSideBar, userInfo } from '../../Redux/actions';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

async function fetchUserDetails(dispatch) {
  await axios.get(process.env.REACT_APP_SERVER_URL + "/api/users").then((res) => {
    const data = res.data.data.attributes;
    console.log(data);
    const user = {
      name: data.displayName,
      profileImg: data.photos[0].value
    };
    dispatch(userInfo(user));
  }).catch((err) => {
    console.error(err);
  })
}

export default function NavBar() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  if (user.name === null) fetchUserDetails(dispatch)

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
};
