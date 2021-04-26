import React from 'react';
import '../style/q-footer.css';

class QFooter extends React.Component {
    render() {
        return (
            <div className='q-footer'>
                {/* this.props.children contains Tag components */}
                {this.props.children}
                <br />
                <div className='q-user'>Posted by: {this.props.username}</div>
                <div className='q-time'>On: {Date(this.props.time).toLocaleString('hi-IN')}</div>
            </div>
        );
    }
}

export default QFooter;