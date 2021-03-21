import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import EnrollPage from './pages/EnrollPage';
import Page from './pages/Page';

function App() {
  return (
  <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Page>
        <Route exact path='/main' component={MainPage} />
        <Route path='/enroll' component={EnrollPage} />
      </Page>
    </Switch>
  </div>
  );
}


export default App;
