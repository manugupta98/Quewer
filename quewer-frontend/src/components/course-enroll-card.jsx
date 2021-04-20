import React from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import Button from './button';
import Description from './description';
import '../style/course-enroll-card.css';
import store from '../Redux/store';
import { enrollCourse, unenrollCourse } from '../Redux/actions';

class CourseEnrollCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enroll: false
        }
    }

    componentDidMount() {
        store.getState().user.user.registeredCourses.filter((course) => {
            if (this.props.id === course.id) {
                this.setState({
                    enroll: true
                })
            }
        })
    }

    handleClick = async () => {
        const enroll = this.state.enroll;
        if (!enroll) {
            await store.dispatch(enrollCourse(this.props.id, this.props.title));
        } else {
            await store.dispatch(unenrollCourse(this.props.id, this.props.title));
        }
        this.setState({
            enroll: !enroll
        })
    }

    render() {
        return (
            <div className='course-enroll-card'>
                <div className='course'>
                    <p className='course-name'>{this.props.title}</p>
                    {(this.props.description) ? <hr /> : null}
                    {(this.props.description) ? <Description enroll>{this.props.description}</Description> : null}
                </div>
                <div className='status'>
                    {
                        (this.state.enroll)
                        ? <Button onClick={this.handleClick} color='rgb(255, 0, 0)' textColor='white' text='Unenroll' />
                        : <Button onClick={this.handleClick} color='rgb(30, 144, 255)' textColor='white' text='Enroll' />
                    }
                </div>
            </div>
        );
    }
}

export default CourseEnrollCard;