import React from 'react';
import SideBar from '../SideBar';
import AdminSideBar from '../Admin/AdminSideBar';
import Navbar from '../Navbar/Navbar';
import '../../style/page.css';
import { useSelector } from "react-redux";

import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
    axios.defaults.withCredentials = true;
}

function Page(props) {
    return (
        <div className='page'>
            {(useSelector(state => state.user.user.type) === 'admin') ? <AdminSideBar /> : <SideBar />}
            <div className='page-content'>
                <Navbar />
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Page;
