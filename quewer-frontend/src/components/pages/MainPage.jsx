import React from 'react';
import CardList from '../card-list';
import QuestionCard from '../question-card';
import DisplayCard from '../DisplayCard/DisplayCard';
import {useSelector} from 'react-redux';

function MainPage({match}) {
    const list = useSelector(state => state.course.currentCourse.questions);
    return (
        <div>
            <DisplayCard name={match.params.courseID} />
            <CardList component={QuestionCard} list={list} linked />
        </div>
    );
}

export default MainPage;