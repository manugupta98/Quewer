import React from 'react';
import '../style/upvote-bookmark.css';
import { FaCaretSquareUp, FaBookmark, FaCaretSquareDown } from 'react-icons/fa';
import { bookmarkAnswer, bookmarkQuestion, upvoteAnswer, upvoteQuestion } from '../Redux/actions';
import {useSelector, useDispatch} from 'react-redux';

import store from '../Redux/store';

export default function UpvoteBookmark(props) {
    console.log("props: ", props)
    const isQues = (!props.answer) ? true : false;
    const id = isQues ? props.questionID : props.answerID;

    const upvoted = useSelector(state => isQues ? state.user.user.questionUpvoted : state.user.user.answerUpvoted);
    const downvoted = useSelector(state => isQues ? state.user.user.questionDownvoted : state.user.user.answerDownvoted);
    const bookmarked = useSelector(state => isQues ? state.user.user.questionBookmarks : state.user.user.answerBookmarks);
    const currQnA = useSelector(state => isQues ? state.course.currentCourse.questions.filter(x => x.id === id) : state.course.currentAnswers.filter(x => x.id === id));

    const count = (currQnA.length > 0) ? currQnA[0].upvotes : 0;
    const voteState = upvoted.includes(id) ? 'up' : (downvoted.includes(id) ? 'down' : 'none');
    const bookmarkState = bookmarked.includes(id) ? true : false;
    const dispatch = useDispatch();

    const activeVoteStyle = {color: 'rgb(14, 143, 206)'};
    const activeBookMarkStyle = {color: 'rgb(218, 165, 32)'};
    const inactiveStyle = {color: 'rgb(128, 128, 128)'};

    React.useEffect(() => {
        console.log('Current QnA', currQnA);
        // console.log('questions', store.getState().course.currentCourse.questions);
        // console.log("course list:", store.getState().course)
    }, [currQnA]);
    
    const handleUpvote = () => {
        switch (voteState) {
            case 'up': {
                if (isQues) dispatch(upvoteQuestion(props.courseID, id, 'cancel', -1));
                else dispatch(upvoteAnswer(props.courseID, props.questionID, id, 'cancel', -1));
                break;
            }
            case 'down': {
                if (isQues) dispatch(upvoteQuestion(props.courseID, id, 'upvote', 2));
                else dispatch(upvoteAnswer(props.courseID, props.questionID, id, 'upvote', 2));
                break;
            }
            case 'none': {
                if (isQues) dispatch(upvoteQuestion(props.courseID, id, 'upvote', 1));
                else dispatch(upvoteAnswer(props.courseID, props.questionID, id, 'upvote', 1));
            }
        }
    };

    const handleDownvote = () => {
        switch (voteState) {
            case 'up': {
                if (isQues) dispatch(upvoteQuestion(props.courseID, id, 'downvote', -2));
                else dispatch(upvoteAnswer(props.courseID, props.questionID, id, 'downvote', -2));
                break;
            }
            case 'down': {
                if (isQues) dispatch(upvoteQuestion(props.courseID, id, 'cancel', 1));
                else dispatch(upvoteAnswer(props.courseID, props.questionID, id, 'cancel', 1));
                break;
            }
            case 'none': {
                if (isQues) dispatch(upvoteQuestion(props.courseID, id, 'downvote', -1));
                else dispatch(upvoteAnswer(props.courseID, props.questionID, id, 'downvote', -1));
            }
        }
    };

    const handleBookmark = () => {
        if (isQues) dispatch(bookmarkQuestion(props.courseID, id, bookmarkState ? 'cancel' : 'bookmark'));
        else dispatch(bookmarkAnswer(props.courseID, props.questionID, id, bookmarkState ? 'cancel' : 'bookmark'));
    };

    return (
        <div className='upvote-bookmark'>
            <div>
                <FaCaretSquareUp className='fa-icon' onClick={handleUpvote} style={voteState === 'up' ? activeVoteStyle : inactiveStyle} />
                <h3 className='count'>{count}</h3>
                <FaCaretSquareDown className='fa-icon' onClick={handleDownvote} style={voteState === 'down' ? activeVoteStyle : inactiveStyle} />
                <br />
                <FaBookmark className='fa-icon' onClick={handleBookmark} style={bookmarkState ? activeBookMarkStyle : inactiveStyle} />
            </div>
        </div>
    );
}