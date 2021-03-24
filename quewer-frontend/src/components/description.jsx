import React from 'react';
import '../style/description.css';

class Description extends React.Component {
    render() {
        return (
            <div>
                {
                    (this.props.enroll) ? <div className='desc'><p className='text'>{this.props.children.slice(0, this.props.length)}</p></div> : 
                    <div className='desc' dangerouslySetInnerHTML={{__html: this.props.children.slice(0, this.props.length)}} />    
                }
            </div>
        );
    }
}

export default Description;