import React from 'react';
import CardList from '../card-list';
import DisplayCard from '../DisplayCard/DisplayCard';
import {useSelector} from 'react-redux';
import Feedback from '../Feedback';

function FeedbackDisplay({match}) {
    const list = useSelector(state => state.course.currentCourse.feedbacks);
    return (
        <div>
            <CardList component={Feedback} list={list} />
        </div>
    );
}

export default FeedbackDisplay;