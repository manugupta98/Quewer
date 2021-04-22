import React from 'react';
import '../style/question-card.css';
import Description from './description';
import Tag from './tag';
import QFooter from './q-footer';
import UpvoteBookmark from './upvote-bookmark';
import { Link } from 'react-router-dom';
import store from '../Redux/store';

class QuestionCard extends React.Component {
    render() {
        return (
            <div className='q-card-main' style={this.props.style}>
                <div className='q-question-upvote'>
                    <UpvoteBookmark questionID={this.props.id} courseID={store.getState().course.currentCourse.id} />
                    {
                        (this.props.linked) ? 
                        <Link to={{pathname: `/question/${this.props.id}`, state: {courseID: store.getState().course.currentCourse.id, question: store.getState().course.currentCourse.questions.filter(question => question.id === this.props.id)}}} className='q-question' style={{textDecoration: 'none', color: 'black'}} >
                            <div>
                                {this.props.title}  
                                <hr />
                                <Description>{this.props.description}</Description>
                            </div>
                        </Link> : 
                        <div className='q-question'>
                            { (this.props.answer) ? this.props.title : null }  
                            { (this.props.answer) ? <hr /> : null }
                            <Description>{this.props.description}</Description>
                        </div>
                    }
                </div>
                <QFooter username={this.props.postedBy} time={this.props.date}>
                    {this.props.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
                </QFooter>
            </div>
        );
    }
}

export default QuestionCard;