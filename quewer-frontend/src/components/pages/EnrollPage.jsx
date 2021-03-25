import React from 'react';
import CardList from '../card-list';
import CourseEnrollCard from '../course-enroll-card';
import { connect } from 'react-redux';
import { fetchCourses } from '../../Redux/actions';
import store from '../../Redux/store';

class EnrollPage extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    componentDidMount() {
        store.dispatch(fetchCourses());
    }

    render() {
        return (
            <CardList component={CourseEnrollCard} list={this.props.courseList} />
        );
    }
    
}

const mapStateToProps = state => ({
    courseList: state.course.courseList
});

export default connect(mapStateToProps)(EnrollPage);
