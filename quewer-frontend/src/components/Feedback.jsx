import React from 'react';
import '../style/question-card.css';
import Description from './description';
import QFooter from './q-footer';

class Feedback extends React.Component {

    render() {
        return (
            <div className='q-card-main' style={this.props.style}>
                    <h1 style={{marginLeft: '10px'}}>{this.props.title}</h1>
                    <hr />
                    <Description style={{marginLeft: '10px'}}>{this.props.comment}</Description>
                <QFooter username={this.props.postedBy} time={this.props.date}><h3 style={{float: 'left', marginTop: '8px', marginLeft: '10px'}}>Rated: </h3><h3 style={{margin: '5px 10px'}} className='rating-s rating'>{this.props.rating}</h3><br/></QFooter>
            </div>
        );
    }
}

export default Feedback;