import React from 'react';
import store from '../../Redux/store';
import '../../style/post.css';
import Button from '../button';
import QuewerEditor from '../QuewerEditor/QuewerEditor';
import { addFeedback, addQuestion, showSelectedCourseOnSidebar } from '../../Redux/actions';
import draftToHtml from 'draftjs-to-html';
import { Redirect } from 'react-router';
import Rating from '../Rating';

export default class FeedbackPage extends React.Component {
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

    handleAnon = () => {
        this.setState({
            anonymous: this.state.anonymous ? false : true
        });
    }
    
    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }


    onSubmit = () => {
        const question = {
            title: this.state.value,
            comment: draftToHtml(this.ref.current.state.contentState),
            anonymous: this.state.anonymous,
            rating: this.refRate.current.state.rate,
            course: {
                id: store.getState().course.currentCourse.id
            },
            postedBy: {
                id: store.getState().user.user.id
            }
        };
        store.dispatch(addFeedback(question, store.getState().course.currentCourse.id));
        this.setState({
            submit: true
        })
    }

    render() {
        return (
            <div className='post'>
                <h1>Rating:</h1>
                <Rating ref={this.refRate} />
                <br />
                <h1>Heading:</h1>
                <textarea className="input" value={this.state.value} onChange={this.handleChange} />
                <h1>Description:</h1>
                <QuewerEditor ref={this.ref} />
                <div style={{ marginTop: '10px' }}>
                    {
                        (this.state.submit) ? <Redirect to={`/course/${store.getState().course.currentCourse.name}`} /> : <Button onClick={this.onSubmit} color='#29348EEE' textColor='white' text='Submit' />
                    }
                    {
                        (this.state.anonymous) ? <Button color='#618CFB' textColor='white' text='Use your name' onClick={this.handleAnon} /> : <Button color='#29348EEE' textColor='white' text='Be anonymous' onClick={this.handleAnon} />
                    }
                </div>
            </div>
        );
    }
}