import React from 'react';
import CourseEnrollCard from '../course-enroll-card/course-enroll-card';
import QuestionCard from '../question-card/question-card';

class CardList extends React.Component {

    componentList = null;

    initialize = () => {
        if(this.props.component === CourseEnrollCard) {
            this.componentList = this.props.list.map((card, id) => <CourseEnrollCard key={id} {...card} />)
        } else if(this.props.component === QuestionCard) {
            this.componentList = this.props.list.map((card, id) => <QuestionCard key={id} {...card} />)
        } 
    }

    render() {
        this.initialize();
        return (
            <div>
                { 
                    this.componentList
                }
            </div>
        );
    }
}

export default CardList;