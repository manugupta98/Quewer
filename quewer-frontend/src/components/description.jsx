import React from 'react';
import '../style/description.css';
import parse from 'html-react-parser';

class Description extends React.Component {
    render() {
        return (
            <div className='desc' style={this.props.style}>
            {
                (this.props.enroll) ? 
                <p className='text'>{parse(this.props.children.slice(0, this.props.length))}</p> : 
                parse(this.props.children.slice(0, this.props.length))
            }
            </div>    
        );
    }
}

export default Description;