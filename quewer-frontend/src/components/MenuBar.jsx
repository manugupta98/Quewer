import React from 'react';
import '../style/question-card.css';
import Description from './description';
import Tag from './tag';
import QFooter from './q-footer';
import UpvoteBookmark from './upvote-bookmark';
import { Link } from 'react-router-dom';
import store from '../Redux/store';
import { fetchAnswers, getUserBookmarked, getUserDownvoted, getUserUpvoted } from '../Redux/actions';
import CardList from './card-list';
import QuestionCard from './question-card';
import { connect } from 'react-redux';

class MenuBar extends React.Component {

    handleClick = (action) => {
        const userID = store.getState().user.user.id;
        document.getElementById("bookmark").style.color = "black";
        document.getElementById("upvote").style.color = "black";
        document.getElementById("downvote").style.color = "black";

        if(action === "bookmark") {
            document.getElementById("bookmark").style.color = "#29348EEE";
            store.dispatch(getUserBookmarked(userID));
        } else if(action === "upvote") {
            document.getElementById("upvote").style.color = "#29348EEE";
            store.dispatch(getUserUpvoted(userID));
        } else if(action === "downvote") {
            document.getElementById("downvote").style.color = "#29348EEE";
            store.dispatch(getUserDownvoted(userID));
        }
    }

    render() {
        return (
            <div>
                <h1 style={{margin: '10px 5%'}}>Questions you have shown interest in:</h1>
                <div className='q-card-main' style={{flexDirection: 'row', justifyContent: 'space-between', padding: '10px 20px'}}>
                    <h3 id="bookmark" style={{cursor: 'pointer'}} onClick={() => this.handleClick("bookmark")}>Bookmarked Questions</h3>
                    <h3 id="upvote" style={{cursor: 'pointer'}} onClick={() => this.handleClick("upvote")}>Upvoted Questions</h3>
                    <h3 id="downvote" style={{cursor: 'pointer'}} onClick={() => this.handleClick("downvote")}>Downvoted Questions</h3>
                </div>
                <CardList component={QuestionCard} list={this.props.list} linked main />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.course.choice
});

export default connect(mapStateToProps)(MenuBar);