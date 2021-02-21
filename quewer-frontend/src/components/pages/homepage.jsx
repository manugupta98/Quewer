import React from 'react';
import '../../style/homepage.css';
import '../../Global.css';
import {quotes, loginPhrase} from '../../GlobalVariables';
import logo from '../../views/logo.png';

class HomePage extends React.Component {
    render() {
        return (
            <div className="App FlexCard RowCard">
            <div className="QuoteCard FlexCard ColumnCard">
              <h1>{quotes}</h1>
              <img src={logo} alt="Quewer Logo" id="logoImage"></img>
            </div>
            <div className="LoginCard FlexCard ColumnCard">
              <h3>{loginPhrase}</h3>
              <a /*onClick = {req}*/ href="http://localhost:5000/api/auth/google">Login using Google</a>
            </div>
      
          </div>
        );
    }
}
export default HomePage;