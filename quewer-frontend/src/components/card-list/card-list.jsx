import React from 'react';
import CourseEnrollCard from '../course-enroll-card/course-enroll-card';
import QuestionCard from '../question-card/question-card';

class CardList extends React.Component {
    render() {
        return (
            <div>
                { (this.props.component === CourseEnrollCard) ? this.props.list.map((card, id) => <CourseEnrollCard key={id} {...card} />) : 
                    (this.props.component === QuestionCard) ? this.props.list.map((card, id) => <CourseEnrollCard key={id} {...card} />) : null
                }
            </div>
        );
    }
}

export default CardList;