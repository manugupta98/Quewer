import React from 'react';
import store from '../../Redux/store';
import '../../style/post.css';
import Button from '../button';
import QuewerEditor from '../QuewerEditor/QuewerEditor';
import { addQuestion } from '../../Redux/actions';

export default class PostQuestion extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            anonymous: false
        }

        this.ref = React.createRef();
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        }, () => console.log(this.state.value));
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
            question: this.state.value,
            desc: this.ref.current.state.editorState.toJS(),
        };
        store.dispatch(addQuestion(question));
        console.log(store.getState());
    }

    render() {
        return(
            <div className='post'>
                <h1>Your Question:</h1>
                <textarea className="input" value={this.state.value} onChange={this.handleChange} />
                <h1>Question Description:</h1>
                <QuewerEditor ref={this.ref} />
                <div style={{marginTop: '10px'}}>
                    <Button onClick={this.onSubmit} color='#29348EEE' textColor='white' text='Submit' />
                    {
                        (this.state.anonymous) ? <Button color='#618CFB' textColor='white' text='Use your name' onClick={this.handleAnon} /> : <Button color='#29348EEE' textColor='white' text='Be anonymous' onClick={this.handleAnon} />
                    }
                </div>
            </div>
        );
    }
}