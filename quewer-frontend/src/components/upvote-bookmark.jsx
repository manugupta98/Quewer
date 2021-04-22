import React from 'react';
import '../style/upvote-bookmark.css';
import { FaCaretSquareUp, FaBookmark, FaCaretSquareDown } from 'react-icons/fa';
import { bookmarkQuestion, upvoteQuestion } from '../Redux/actions';
import store from '../Redux/store';

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
        const user = store.getState().user.user;
        const qid = this.props.questionID;
        const upvoted = user.questionUpvoted;
        const downvoted = user.questionDownvoted;
        const bookmarked = user.questionBookmarks;
        this.setState({
            upvoteCount: this.props.upvotes
        })
        if(upvoted.includes(qid)) 
            this.setState({
                voted: 'upvote',
                upvoteColor: 'rgb(14, 143, 206)'
            })
        if(downvoted.includes(qid))
            this.setState({
                voted: 'downvote',
                downvoteColor: 'rgb(14, 143, 206)'
            })
        if(bookmarked.includes(qid))
            this.setState({
                bookmarked: true,
                bookmarkColor: 'rgb(218, 165, 32)',
            })
    }

    handleUpvoteClick = () => {
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
    }

    handleDownvoteClick = () => {
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
    }

    handleBookmarkClick = () => {
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

export default UpvoteBookmark;