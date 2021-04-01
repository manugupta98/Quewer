import React from 'react';
import CourseEnrollCard from './course-enroll-card';
import QuestionCard from './question-card';

class CardList extends React.Component {

    componentList = null;

    initialize = () => {
        console.log(this.props.list);
        if(this.props.component === CourseEnrollCard) {
            this.componentList = this.props.list.map(card => <CourseEnrollCard key={card.id} id={card.id} {...card.attributes} />)
        } else if(this.props.component === QuestionCard) {
            this.componentList = this.props.list.map(card => <QuestionCard key={card.id} id={card.id} {...card.attributes} postedBy={card.relationships.postedBy.data.id} />)
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