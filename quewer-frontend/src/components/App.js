import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage';
import MainPage from './pages/main';
import EnrollPage from './pages/enroll'

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
