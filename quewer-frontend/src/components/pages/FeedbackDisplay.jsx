import React from 'react';
import CardList from '../card-list';
import DisplayCard from '../DisplayCard/DisplayCard';
import {useSelector} from 'react-redux';
import Feedback from '../Feedback';

function FeedbackDisplay({match, location}) {
    const list = useSelector(state => state.course.currentCourse.feedbacks);
    console.log(location);
    return (
        <div>
            {(list.length > 0) ? <h1 style={{margin: '10px 5%'}}>Feedbacks for {location.state.name}</h1> : null}
            {(list.length === 0) ? <h3 style={{textAlign: 'center', }}>No feedbacks yet!</h3> : null }
            <CardList component={Feedback} list={list} />
        </div>
    );
}

export default FeedbackDisplay;