import React from 'react';
import '../style/question-card.css';
import Description from './description';
import QFooter from './q-footer';

class Announcement extends React.Component {

    render() {
        return (
            <div className='q-card-main' style={this.props.style}>
                    <h1 style={{marginLeft: '10px'}}>{this.props.title}</h1>
                    <hr />
                    <Description style={{marginLeft: '10px'}}>{this.props.description}</Description>
                <QFooter username={this.props.postedBy.name} time={this.props.date} />
            </div>
        );
    }
}

export default Announcement;