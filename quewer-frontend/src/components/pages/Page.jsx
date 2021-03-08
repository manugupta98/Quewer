import React from 'react';
import SideBar from '../SideBar';
import Navbar from '../Navbar/Navbar';
import '../../style/page.css';

import axios from 'axios'

function getUserDeails() {
    console.log("cndasj");
    axios.get(process.env.REACT_APP_SERVER_URL + "/api/user").then((res) => {
        console.log("res");
        console.log(res);
        return res;
    }).catch((err) => {
        console.log("err");
        console.log(err);
    }).then(() => {
        console.log("always");
    })
    console.log("after");
}

function Page(props) {

    let user = getUserDeails();
    console.log(user);

    return (
        <div className='page'>
            <SideBar />
            <div className='page-content'>
                <Navbar username='John' />
                <div className='page-col'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Page;
