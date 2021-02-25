import React from 'react';
import '../../style/homepage.css';
import '../../Global.css';
import {quotes, loginPhrase} from '../../GlobalVariables';
import logo from '../../views/logo.png';

var loginUrl = process.env.REACT_APP_SERVER_URL + "/api/auth/google?uri=" + process.env.REACT_APP_CLIENT_URL + "/main"

class HomePage extends React.Component {
  login(){
    window.location.href= loginUrl;
  }
  render() {
    console.log(loginUrl);
    return (
      <div className="App FlexCard RowCard">
      <div className="QuoteCard FlexCard ColumnCard">
        <h1>{quotes}</h1>
        <img src={logo} alt="Quewer Logo" id="logoImage"></img>
      </div>
      <div className="LoginCard FlexCard ColumnCard">
        <h3>{loginPhrase}</h3>
        <button id="loginButton" onClick={this.login}>Login using Google</button>
      </div>
      </div>
    );
  }
}
export default HomePage;
