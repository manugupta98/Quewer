import React from 'react';
import store from '../../Redux/store';
import '../../style/post.css';
import Button from '../button';
import QuewerEditor from '../QuewerEditor/QuewerEditor';
import { addQuestion } from '../../Redux/actions';
import draftToHtml from 'draftjs-to-html';
import { Redirect } from 'react-router';

const {QuestionSerializer, QuestionDeserializer} = require('../../Redux/serializer/question');

export default class PostQuestion extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            anonymous: false,
            submit: false
        }

        this.ref = React.createRef();
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
        const question = {
            title: this.state.value,
            description: draftToHtml(this.ref.current.state.contentState),
            date: Date(),
            attachments: [],
            anonymous: this.state.anonymous,
            course: {
                id: store.getState().course.currentCourse.id
            },
            postedBy: {
                id: store.getState().user.user.id
            }
        };
        console.log(question);
        const JSONBody = QuestionSerializer.serialize(question);
        console.log(JSONBody);

        store.dispatch(addQuestion(JSONBody, store.getState().course.currentCourse.id));
        this.setState({
            submit: true
        })
    }

    render() {
        return (
            <div className='post'>
                <h1>Your Question:</h1>
                <textarea className="input" value={this.state.value} onChange={this.handleChange} />
                <h1>Question Description:</h1>
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