import React from 'react';
import '../../style/homepage.css';
import '../../Global.css';
import {loginPhrase} from '../../GlobalVariables';
import logo from '../../views/logo.gif';
import GoogleButton from 'react-google-button';

// var loginUrl = process.env.REACT_APP_SERVER_URL + "/api/auth/google";
var loginUrl = process.env.REACT_APP_SERVER_URL + "/api/auth/google?uri=" + process.env.REACT_APP_CLIENT_URL + "/main"

class HomePage extends React.Component {
  login(){
    window.location.href= loginUrl;
  }
  render() {
    console.log(loginUrl);
    return (
      <div className="App FlexCard RowCard">
      <img src={logo} alt="Quewer Logo" id="logoImage"></img>
      <div className="LoginCard FlexCard ColumnCard">
        <h1 style={{fontSize: "80px"}}>Quewer</h1>
        <h3>{loginPhrase}</h3>
        <GoogleButton onClick={this.login} id='loginButton'/>
      </div>
      </div>
    );
  }
}
export default HomePage;
