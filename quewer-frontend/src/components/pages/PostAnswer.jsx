import React from 'react';
import QuewerEditor from '../QuewerEditor/QuewerEditor';
import '../../style/post.css';
import Button from '../button';
import { Redirect } from 'react-router';
import draftToHtml from 'draftjs-to-html';
import store from '../../Redux/store';
import { addAnswer } from '../../Redux/actions';

const {QuestionSerializer, QuestionDeserializer} = require('../../Redux/serializer/question');

export default class PostAnswer extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            anonymous: false,
            submit: false
        }

        this.ref = React.createRef();
    }
    
    handleAnon = () => {
        if(this.state.anonymous)
            this.setState({
                anonymous: false
            });
        else
            this.setState({
                anonymous: true
            });
    }

    onSubmit = () => {
        const question = {
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

        store.dispatch(addAnswer(JSONBody, this.props.location.state.questionID, this.props.location.state.courseID));
        this.setState({
            submit: true
        })
    }

    render() {
        return (
            <div className="post">
                <h1>Post your answer:</h1>
                <QuewerEditor ref={this.ref} />
                <div style={{marginTop: '10px'}}>
                     {(this.state.submit) ? <Redirect to={`/main`} />  : <Button color='#29348EEE' textColor='white' onClick={this.onSubmit} text='Submit' /> }
                    {
                        (this.state.anonymous) ? <Button color='#618CFB' textColor='white' text='Use your name' onClick={this.handleAnon} /> : <Button color='#29348EEE' textColor='white' text='Be anonymous' onClick={this.handleAnon} />
                    }
                </div>
            </div>
        );
    }
}