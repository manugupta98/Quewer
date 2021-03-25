import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import EnrollPage from './pages/EnrollPage';
import PostAnswer from './pages/PostAnswer';
import PostQuestion from './pages/PostQuestion';
import Page from './pages/Page';
import { connect } from 'react-redux';
import Loading from './Loading';

function App({loading}) {
  return (
  <div>
    {
      (loading) ? <Loading /> : null
    }
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Page>
          <Route exact path='/main' component={MainPage} />
          <Route path='/enroll' component={EnrollPage} />
          <Route path='/postanswer' component={PostAnswer} />
          <Route path='/postquestion' component={PostQuestion} />
          <Route path='/course/:courseID' component={MainPage} />
        </Page>
    </Switch>
  </div>
  );
}

const mapStateToProps = state => ({
  loading: state.user.loading
});

export default connect(mapStateToProps)(App);
