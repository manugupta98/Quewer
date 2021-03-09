import React from 'react';
import SideBar from '../SideBar';
import Navbar from '../Navbar/Navbar';
import '../../style/page.css';

import axios from 'axios'

if (process.env.NODE_ENV === 'development'){
  axios.defaults.withCredentials = true;
}

async function getUserDeails(){
    let data = 8;
    await axios.get(process.env.REACT_APP_SERVER_URL + "/api/user").then((res) => {
        data = res.data;
    }).catch((err) => {
        console.error(err);
        data = err;
    })
    return data;
}


class Page extends React.Component{

    constructor(props){
        super(props);
        this.state = {name: "", profileImg: ""}

        getUserDeails().then((body) => {
            console.log(body);
            let name = body.data.attributes.displayName;
            let img = body.data.attributes.photos[0].value;
            this.setState({name: name, profileImg: img});
          });
    }

    render(){
        return (
            <div className='page'>
                <SideBar />
                <div className='page-content'>
                    <Navbar username={this.state.name} image={this.state.profileImg} />
                    <div className='page-col'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;
