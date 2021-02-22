import React from 'react';
import SideBar from '../SideBar';
import Navbar from '../Navbar/Navbar';
import '../../style/page.css';
import DisplayCard from '../DisplayCard/DisplayCard';

function Page(props) {
    return (
        <div className='page'>
            <SideBar />
            <div className='page-content'>
                <Navbar username='John' />
                <DisplayCard />
                <div className='page-col'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Page;