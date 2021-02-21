import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage';
import AboutPage from './pages/about';

function App() {
  return (

  <div>
      <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/about' component={AboutPage} />
    {/* <Route path='/about' component={AboutPage} />
    <Route path='/product' component={ProductPage} />
    <Route path='/contact' component={ContactPage} /> */}
  </Switch>
  </div>
  );
}


export default App;
