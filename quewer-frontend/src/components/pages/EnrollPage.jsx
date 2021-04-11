import React from 'react';
import CardList from '../card-list';
import Searchbar from '../Searchbar';
import CourseEnrollCard from '../course-enroll-card';
import { connect } from 'react-redux';
import { fetchCourses } from '../../Redux/actions';
import store from '../../Redux/store';

class EnrollPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
            list: this.props.courseList
        }
    }
    
    componentDidMount() {
        store.dispatch(fetchCourses());
        console.log(this.props.courseList);
    }

    handleChange = (value) => {
        const list = this.props.courseList.filter((course) => {
            const title = course.attributes.title;
            const description = course.attributes.description;
            return title.includes(value) || description.includes(value)
        })
        this.setState({
            value: value,
            list: list
        });
    }

    render() {
        return (
            <div>
                <Searchbar onChange={this.handleChange} />
                <CardList component={CourseEnrollCard} list={this.state.list} />
            </div>
        );
    }
    
}

const mapStateToProps = state => ({
    courseList: state.course.courseList
});

export default connect(mapStateToProps)(EnrollPage);
