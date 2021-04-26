import React from 'react';
import store from '../../Redux/store';
import '../../style/post.css';
import Button from '../button';
import QuewerEditor from '../QuewerEditor/QuewerEditor';
import { addAnnouncement, addFeedback, addQuestion, showSelectedCourseOnSidebar } from '../../Redux/actions';
import draftToHtml from 'draftjs-to-html';
import { Redirect } from 'react-router';
import Rating from '../Rating';

export default class AnnouncementPage extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            anonymous: false,
            submit: false,
        }

        this.ref = React.createRef();
        this.refRate = React.createRef();
        showSelectedCourseOnSidebar();
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleAnon = () => {
        this.setState({
            anonymous: this.state.anonymous ? false : true
        });
    }

    onSubmit = () => {
        const announcement = {
            title: this.state.value,
            description: draftToHtml(this.ref.current.state.contentState),
            course: {
                id: store.getState().course.currentCourse.id
            },
            postedBy: {
                id: store.getState().user.user.id
            }
        };
        store.dispatch(addAnnouncement(announcement, store.getState().course.currentCourse.id));
        this.setState({
            submit: true
        })
    }

    render() {
        return (
            <div className='post'>
                <h1 style={{margin: '10px 5%'}}>Post an Announcement</h1>
                <h1>Heading:</h1>
                <textarea className="input" value={this.state.value} onChange={this.handleChange} />
                <h1>Description:</h1>
                <QuewerEditor ref={this.ref} />
                <div style={{ marginTop: '10px' }}>
                    {
                        (this.state.submit) ? <Redirect to={`/course/${store.getState().course.currentCourse.name}`} /> : <Button onClick={this.onSubmit} color='#29348EEE' textColor='white' text='Submit' />
                    }
                </div>
            </div>
        );
    }
}