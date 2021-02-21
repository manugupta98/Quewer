import React from 'react';
import '../style/description.css';

class Description extends React.Component {
    render() {
        return (
            <div className='desc'>
                <p className='text'>{this.props.children.slice(0, this.props.length)}</p>
            </div>
        );
    }
}

export default Description;