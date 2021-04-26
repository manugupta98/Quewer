import React from 'react';
import '../style/question-card.css';
import Description from './description';
import Tag from './tag';
import QFooter from './q-footer';
import UpvoteBookmark from './upvote-bookmark';
import { Link } from 'react-router-dom';
import store from '../Redux/store';
import { fetchAnswers, addComment} from '../Redux/actions';
import CommentList from "./CommentsList";
import Attachment from "./Attachment/attachment";
import { Grid } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({

//   }));

class QuestionCard extends React.Component {


    handleClick = () => {
        const courseID = store.getState().course.currentCourse.id;
        const questionID = this.props.id;
        store.dispatch(fetchAnswers(courseID, questionID));
    }

    addComment = (text) => {
        let newComment = {comment: text};
        console.log(text);
        console.log(newComment);
        let courseId = this.props.course;
        let questionId = this.props.question;
        let answerId = this.props.id;
        store.dispatch(addComment(newComment, courseId, questionId, answerId));
    }

    render() {
        return (
            <div className='q-card-main' style={this.props.style}>
                <div className='q-question-upvote'>
                    <UpvoteBookmark questionID={this.props.id} courseID={store.getState().course.currentCourse.id} upvotes={this.props.upvotes} />
                    {
                        (this.props.linked) ?
                            <Link to={{ pathname: `/question/${this.props.id}`, state: { courseID: store.getState().course.currentCourse.id, question: store.getState().course.currentCourse.questions.filter(question => question.id === this.props.id) } }} onClick={this.handleClick} className='q-question' style={{ textDecoration: 'none', color: 'black' }} >
                                <div>
                                    {this.props.title}
                                    <hr />
                                    <Description>{this.props.description}</Description>
                                    <Grid container spacing={0} alignItems='center' direction='row' justify='flex-end'>
                                        {this.props.attachments.map(attachment => {
                                            return (
                                                <Grid item style={{ margin: '10px 10px 10px 0px' }}>
                                                    <Attachment canDelete={false} name={attachment.name} id={attachment.id} />
                                                </Grid>
                                            )
                                        })
                                        }
                                    </Grid>
                                </div>
                            </Link> :
                            // <div>
                            <div className='q-question'>
                                {(!this.props.answer) ? this.props.title : null}
                                {(!this.props.answer) ? <hr /> : null}
                                <Description>{this.props.description}</Description>

                                <Grid container spacing={0} alignItems='center' direction='row' justify='flex-end'>
                                    {this.props.attachments.map(attachment => {
                                        return (
                                            <Grid item style={{ margin: '10px 10px 10px 0px' }}>
                                                <Attachment canDelete={false} name={attachment.name} id={attachment.id} />
                                            </Grid>
                                        )
                                    })
                                    }
                                </Grid>

                            </div>
                        // </div>
                    }
                </div>
                <QFooter username={this.props.postedBy} time={this.props.date}>
                    {this.props.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
                </QFooter>
                {(this.props.answer) ? <CommentList comments={this.props.comments} addComment={this.addComment}/> : null}
            </div>
        );
    }
}

export default QuestionCard;