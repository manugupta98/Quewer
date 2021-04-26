import { Redirect, Route, Switch } from 'react-router-dom';
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
import FeedbackPage from '../components/pages/FeedbackPage';
import FeedbackDisplay from '../components/pages/FeedbackDisplay';
import AnnouncementPage from './pages/AnnouncementPage';
import AnnouncementDisplay from './pages/AnnouncementDisplay';
import PrivateRoute from './PrivateRoute';
import CheckLogin from './CheckLogin';
import store from '../Redux/store';
import MenuBar from './MenuBar';

function App({loading, userType}) {
  return (
  <div>
    {
      (loading) ? <Loading /> : null
    }
    {
      (store.getState().user.user.id !== null) ? <Redirect to="/checklogin" /> : null
    }
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/checklogin' component={CheckLogin} />
        <Page>
          <PrivateRoute exact path='/main' component={MenuBar} />
          <PrivateRoute path='/enroll' component={EnrollPage} />
          <PrivateRoute path='/postanswer' component={PostAnswer} />
          <PrivateRoute path='/postquestion' component={PostQuestion} />
          <PrivateRoute path='/course/:courseID' component={MainPage} />
          <PrivateRoute path='/question/:questionID' component={AnswerPage} />
          { (store.getState().user.user.type === "admin") ? <PrivateRoute path='/admin' component={Admin} /> : null }
          <PrivateRoute path='/addcourse' component={AddCourse} />
          <PrivateRoute path='/postfeedback' component={FeedbackPage} />
          <PrivateRoute path='/postannouncement' component={AnnouncementPage} />
          <PrivateRoute path='/getfeedback' component={FeedbackDisplay} />
          <PrivateRoute path='/getannouncement' component={AnnouncementDisplay} />
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
