import React from 'react';
import './tag.css';

class Tag extends React.Component {
    render() {
        return (
            <div className='tag'>
                <p className='tag-text'>{this.props.tag}</p>
            </div>
        );
    }
}

export default Tag;