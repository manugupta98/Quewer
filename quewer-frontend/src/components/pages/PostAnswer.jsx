import React from 'react';
import QuewerEditor from '../QuewerEditor/QuewerEditor';
import '../../style/post.css';
import Button from '../button';
import { Redirect } from 'react-router';
import draftToHtml from 'draftjs-to-html';
import store from '../../Redux/store';
import { addAnswer, showSelectedCourseOnSidebar } from '../../Redux/actions';
import AttachFilesButton from '../Attachment/AttachFilesButton';
import Attachment from '../Attachment/attachment'
import { Grid } from '@material-ui/core';
import { saveAs } from 'file-saver';

const {QuestionSerializer, QuestionDeserializer} = require('../../Redux/serializer/question');

export default class PostAnswer extends React.Component {
    files = []
    constructor() {
        super();

        this.state = {
            value: '',
            anonymous: false,
            submit: false
        }

        this.files = [];
        this.ref = React.createRef();
        showSelectedCourseOnSidebar();
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
        const answer = {
            title: 'nil',
            description: draftToHtml(this.ref.current.state.contentState),
            date: Date(),
            attachments: [],
            anonymous: this.state.anonymous,
            course: {
                id: this.props.location.state.courseID
            },
            postedBy: {
                id: store.getState().user.user.id
            },
            question: {
                id: this.props.location.state.questionID
            }
        };
        store.dispatch(addAnswer(answer, this.props.location.state.questionID, this.props.location.state.courseID, this.files));
        this.files = []
        this.setState({
            submit: true
        })
    }

    onUpload = (newFiles) => {
        this.files = newFiles;
        this.forceUpdate();
    }

    onDelete = (file) => {
        this.files.splice(this.files.indexOf(file), 1);
        this.forceUpdate();
    }

    onDownload = (file) => {
        saveAs(file);
    }

    render() {
        return (
            <div className="post">
                <h1>Post your answer:</h1>
                <QuewerEditor ref={this.ref} />
                <Grid style={{ marginTop: '10px' }} container spacing={2}>
                    {
                        this.files.map(file => (
                            <Grid item>
                                <Attachment file={file} canDelete={true} onDelete={this.onDelete} onDownload={this.onDownload} />
                            </Grid>
                        ))
                    }
                </Grid>
                <div style={{marginTop: '10px'}}>
                     {(this.state.submit) ? <Redirect to={`/main`} />  : <Button color='#29348EEE' textColor='white' onClick={this.onSubmit} text='Submit' /> }
                    {
                        (store.getState().user.user.type === "student") ? 
                        (this.state.anonymous) ? <Button color='#618CFB' textColor='white' text='Use your name' onClick={this.handleAnon} /> : <Button color='#29348EEE' textColor='white' text='Be anonymous' onClick={this.handleAnon} /> : null
                    }
                    {
                        <AttachFilesButton onUpload={this.onUpload} initialFiles={this.files}/>
                    }
                </div>
            </div>
        );
    }
}