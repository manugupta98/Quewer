import React from 'react';
import SideBar from '../SideBar';
import Navbar from '../Navbar/Navbar';
import '../../style/page.css';

function Page(props) {
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