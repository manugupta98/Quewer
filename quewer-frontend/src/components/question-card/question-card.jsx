import React from 'react';
import './question-card.css';
import Description from '../description/description';
import Tag from '../tag/tag';
import QFooter from '../q-footer/q-footer';
import UpvoteBookmark from '../upvote-bookmark/upvote-bookmark';

class QuestionCard extends React.Component {
    render() {
        return (
            <div className='q-card-main'>
                <div className='q-question-upvote'>
                    <UpvoteBookmark />
                    <div className='q-question'>{this.props.question}</div>
                </div>
                <hr />
                <Description length={300}>{this.props.desc}</Description>
                <QFooter username={this.props.postedBy} time={this.props.on}>
                    {this.props.tags.map(tag => <Tag tag={tag} />)}
                </QFooter>
            </div>
        );
    }
}

export default QuestionCard;