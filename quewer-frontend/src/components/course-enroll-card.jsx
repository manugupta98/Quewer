import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
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

    handleClick = () => {
        const enroll = this.state.enroll;
        if(!enroll) {
            store.dispatch(enrollCourse(this.props.course));
        } else {
            store.dispatch(unenrollCourse(this.props.course));
        }
        this.setState({
            enroll: !enroll
        })
    }

    render() {
        return (
            <div className='course-enroll-card'>
                <div className='course'>
                    <p className='course-name'>{ this.props.course }</p>
                    { (this.props.desc) ? <hr /> : null }
                    { (this.props.desc) ? <Description enroll>{ this.props.desc }</Description> : null }
                </div>
                <div className='status'>
                    { 
                        (this.state.enroll) ? <div><FaCheckCircle style={{color: 'rgb(30, 144, 255)', fontSize: '30px'}} /> Enrolled <Button onClick={ this.handleClick } color='rgb(220, 20, 60)' textColor='black' text='Uneroll' /></div> : <Button onClick={ this.handleClick } color='rgb(30, 144, 255)' textColor='white' text='Enroll' />
                    }
                </div>
            </div>
        );
    }
}

export default CourseEnrollCard;