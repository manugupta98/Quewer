import React from 'react';
import '../style/upvote-bookmark.css';
import { FaCaretSquareUp, FaBookmark, FaCaretSquareDown } from 'react-icons/fa';
import { bookmarkAnswer, bookmarkQuestion, upvoteAnswer, upvoteQuestion } from '../Redux/actions';
import store from '../Redux/store';
import { connect } from 'react-redux';

class UpvoteBookmark extends React.Component {
    
    constructor() {
        super();
        this.state = {
            upvoteCount: 0,
            voted: 'neutral',
            bookmarked: false,
            upvoteColor: 'rgb(128, 128, 128)',
            bookmarkColor: 'rgb(128, 128, 128)',
            downvoteColor: 'rgb(128, 128, 128)'
        }
    }

    componentDidMount() {
        this.setState({
            upvoteCount: this.props.upvotes
        })
        if(!this.props.answer) {
            if(this.props.qUp.length >= 0)
            if(this.props.qUp.includes(this.props.questionID)) 
            this.setState({
                voted: 'upvote',
                upvoteColor: 'rgb(14, 143, 206)'
            })
            if(this.props.qDown.length >= 0)
            if(this.props.qDown.includes(this.props.questionID))
            this.setState({
                voted: 'downvote',
                downvoteColor: 'rgb(14, 143, 206)'
            })
            if(this.props.qBook.length >= 0)
            if(this.props.qBook.includes(this.props.questionID))
            this.setState({
                bookmarked: true,
                bookmarkColor: 'rgb(218, 165, 32)',
            })
        } else {
            if(this.props.aUp.length >= 0)
                if(this.props.aUp.includes(this.props.answerID)) 
                    this.setState({
                        voted: 'upvote',
                        upvoteColor: 'rgb(14, 143, 206)'
                    })
            if(this.props.aDown.length >= 0)
                if(this.props.aDown.includes(this.props.answerID))
                    this.setState({
                        voted: 'downvote',
                        downvoteColor: 'rgb(14, 143, 206)'
                    })
            if(this.props.aBook.length >= 0)
                if(this.props.aBook.includes(this.props.answerID))
                    this.setState({
                        bookmarked: true,
                        bookmarkColor: 'rgb(218, 165, 32)',
                    })
        }
    }

    handleUpvoteClick = () => {
        if(!this.props.answer) {
            if(this.state.voted === 'neutral') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteQuestion(this.props.courseID, this.props.questionID, "upvote"));
                this.setState({
                    voted: 'upvote',
                    upvoteColor: 'rgb(14, 143, 206)',
                    upvoteCount: count + 1
                })
            } else if(this.state.voted === 'downvote') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteQuestion(this.props.courseID, this.props.questionID, "upvote"));
                this.setState({
                    voted: 'upvote',
                    upvoteColor: 'rgb(14, 143, 206)',
                    downvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count + 2
                })
            } else {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteQuestion(this.props.courseID, this.props.questionID, "cancel"));
                this.setState({
                    voted: 'neutral',
                    upvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count - 1
                })
            }
        } else {
            if(this.state.voted === 'neutral') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "upvote"));
                this.setState({
                    voted: 'upvote',
                    upvoteColor: 'rgb(14, 143, 206)',
                    upvoteCount: count + 1
                })
            } else if(this.state.voted === 'downvote') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "upvote"));
                this.setState({
                    voted: 'upvote',
                    upvoteColor: 'rgb(14, 143, 206)',
                    downvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count + 2
                })
            } else {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "cancel"));
                this.setState({
                    voted: 'neutral',
                    upvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count - 1
                })
            }
        }
    }

    handleDownvoteClick = () => {
        if(!this.props.answer) {
            if(this.state.voted === 'neutral') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteQuestion(this.props.courseID, this.props.questionID, "downvote"));
                this.setState({
                    voted: 'downvote',
                    downvoteColor: 'rgb(14, 143, 206)',
                    upvoteCount: count - 1
                })
            } else if(this.state.voted === 'upvote') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteQuestion(this.props.courseID, this.props.questionID, "downvote"));
                this.setState({
                    voted: 'downvote',
                    downvoteColor: 'rgb(14, 143, 206)',
                    upvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count - 2
                })
            } else {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteQuestion(this.props.courseID, this.props.questionID, "cancel"));
                this.setState({
                    voted: 'neutral',
                    downvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count + 1
                })
            }
        } else {
            if(this.state.voted === 'neutral') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "downvote"));
                this.setState({
                    voted: 'downvote',
                    downvoteColor: 'rgb(14, 143, 206)',
                    upvoteCount: count - 1
                })
            } else if(this.state.voted === 'upvote') {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "downvote"));
                this.setState({
                    voted: 'downvote',
                    downvoteColor: 'rgb(14, 143, 206)',
                    upvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count - 2
                })
            } else {
                const count = this.state.upvoteCount;
                store.dispatch(upvoteAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "cancel"));
                this.setState({
                    voted: 'neutral',
                    downvoteColor: 'rgb(128, 128, 128)',
                    upvoteCount: count + 1
                })
            } 
        }
    }

    handleBookmarkClick = () => {
        if(!this.props.answer) {
            if(!this.state.bookmarked) {
                store.dispatch(bookmarkQuestion(this.props.courseID, this.props.questionID, "bookmark"));
                this.setState({
                    bookmarked: true,
                    bookmarkColor: 'rgb(218, 165, 32)',
                })
            } else {
                store.dispatch(bookmarkQuestion(this.props.courseID, this.props.questionID, "cancel"));
                this.setState({
                    bookmarked: false,
                    bookmarkColor: 'rgb(128, 128, 128)',
                })
            }
        } else {
            if(!this.state.bookmarked) {
                store.dispatch(bookmarkAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "bookmark"));
                this.setState({
                    bookmarked: true,
                    bookmarkColor: 'rgb(218, 165, 32)',
                })
            } else {
                store.dispatch(bookmarkAnswer(this.props.courseID, this.props.questionID, this.props.answerID, "cancel"));
                this.setState({
                    bookmarked: false,
                    bookmarkColor: 'rgb(128, 128, 128)',
                })
            }
        }
    }

    render() {
        return (
            <div className='upvote-bookmark'>
                <div>
                    <FaCaretSquareUp className='fa-icon' onClick={this.handleUpvoteClick} style={{ color: `${ this.state.upvoteColor }` }} />
                    <h3 className='count'>{this.state.upvoteCount}</h3>
                    <FaCaretSquareDown className='fa-icon' onClick={this.handleDownvoteClick} style={{ color: `${ this.state.downvoteColor }` }} />
                    <br />
                    <FaBookmark className='fa-icon' onClick={this.handleBookmarkClick} style={{ color: `${ this.state.bookmarkColor }` }} />
                </div>
            </div>
        ); 
    }
}

const mapStateToProps = state => ({
    qUp: state.user.user.questionUpvoted,
    qDown: state.user.user.questionDownvoted,
    qBook: state.user.user.questionBookmarks,
    aUp: state.user.user.answerUpvoted,
    aDown: state.user.user.answerDownvoted,
    aBook: state.user.user.answerBookmarks
});

export default connect(mapStateToProps)(UpvoteBookmark);