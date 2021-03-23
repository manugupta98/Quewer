import React from 'react';
import '../../style/post.css';
import Button from '../button';
import QuewerEditor from '../QuewerEditor/QuewerEditor';

export default class PostQuestion extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            anonymous: false
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
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

    render() {
        return(
            <div className='post'>
                <h1>Your Question:</h1>
                <div className="input" value={this.state.value} onChange={this.handleChange} contentEditable />
                <h1>Question Description:</h1>
                <QuewerEditor />
                <div style={{marginTop: '10px'}}>
                    <Button color='#29348EEE' textColor='white' text='Submit' />
                    {
                        (this.state.anonymous) ? <Button color='#618CFB' textColor='white' text='Use your name' onClick={this.handleAnon} /> : <Button color='#29348EEE' textColor='white' text='Be anonymous' onClick={this.handleAnon} />
                    }
                </div>
            </div>
        );
    }
}