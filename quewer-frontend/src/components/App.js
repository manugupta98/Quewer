import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import EnrollPage from './pages/EnrollPage';
import PostAnswer from './pages/PostAnswer';
import PostQuestion from './pages/PostQuestion';
import Page from './pages/Page';
import Loading from './Loading';
import { connect } from 'react-redux';
import AnswerPage from './pages/AnswerPage';
import Admin from './Admin/Admin';
import AddCourse from './Admin/AddCourse';

function App({loading, userType}) {
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
          <Route path='/question/:questionID' component={AnswerPage} />
          <Route path='/admin' component={Admin} />
          <Route path='/addcourse' component={AddCourse} />
        </Page>
    </Switch>
  </div>
  );
}

const mapStateToProps = state => ({
  loading: state.appState.loading,
  userType: state.user.user.type
});

export default connect(mapStateToProps)(App);
