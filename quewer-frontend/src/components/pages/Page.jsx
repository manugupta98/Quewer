import React from 'react';
import SideBar from '../SideBar';
import Navbar from '../Navbar/Navbar';
import '../../style/page.css';

import axios from 'axios'

if (process.env.NODE_ENV === 'development'){
  axios.defaults.withCredentials = true;
}

class Page extends React.Component{
    render(){
        return (
            <div className='page'>
                <SideBar />
                <div className='page-content'>
                    <Navbar />
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;
