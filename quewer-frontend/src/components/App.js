import '../style/App.css';
import '../Global.css'
import {quotes, loginPhrase} from '../GlobalVariables'
import logo from '../views/logo.png'

function App() {
  return (
    <div className="App FlexCard RowCard">
      <div className="QuoteCard FlexCard ColumnCard">
        <h1>{quotes}</h1>
        <img src={logo} alt="Quewer Logo" id="logoImage"></img>
      </div>
      <div className="LoginCard FlexCard ColumnCard">
        <h3>{loginPhrase}</h3>
        <button id="loginButton">Login using Google</button>
      </div>
    </div>
  );
}


export default App;
