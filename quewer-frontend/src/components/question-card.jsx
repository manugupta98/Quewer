import React from 'react';
import '../style/question-card.css';
import Description from './description';
import Tag from './tag';
import QFooter from './q-footer';
import UpvoteBookmark from './upvote-bookmark';

class QuestionCard extends React.Component {
    render() {
        return (
            <div className='q-card-main'>
                <div className='q-question-upvote'>
                    <UpvoteBookmark />
                    <div className='q-question'>
                        {this.props.title}  
                        <hr />
                        <Description length={300}>{this.props.description}</Description>
                    </div>
                </div>
                <QFooter username={this.props.postedBy} time={this.props.date}>
                    {this.props.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
                </QFooter>
            </div>
        );
    }
}

export default QuestionCard;