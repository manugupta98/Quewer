import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import EnrollPage from './pages/EnrollPage'

function App() {
  return (

  <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/main' component={MainPage} />
      <Route path='/enroll' component={EnrollPage} />
    </Switch>
  </div>
  );
}


export default App;
