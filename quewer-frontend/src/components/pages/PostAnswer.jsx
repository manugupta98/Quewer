import React from 'react';
import QuewerEditor from '../QuewerEditor/QuewerEditor';
import '../../style/post.css';
import Button from '../button';

export default class PostAnswer extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            anonymous: false
        }
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
        return (
            <div className="post">
                <h1>Post your answer:</h1>
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