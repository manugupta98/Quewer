import React from 'react';
import Announcement from './Announcement';
import CourseEnrollCard from './course-enroll-card';
import Feedback from './Feedback';
import QuestionCard from './question-card';

class CardList extends React.Component {

    componentList = null;

    initialize = () => {
        if(this.props.component === CourseEnrollCard) {
            this.componentList = this.props.list.map(card => <CourseEnrollCard key={card.id} id={card.id} {...card} />)
        } else if(this.props.component === QuestionCard && this.props.main) {
            this.componentList = this.props.list.map(card => <QuestionCard key={card._id} id={card._id} {...card} postedBy={(card.anonymous) ? "Anonymous" : card.postedBy.name} linked={this.props.linked} answer={this.props.answer} />)
        } else if(this.props.component === QuestionCard) {
            this.componentList = this.props.list.map(card => <QuestionCard key={card.id} id={card.id} {...card} postedBy={(card.anonymous) ? "Anonymous" : card.postedBy.name} linked={this.props.linked} answer={this.props.answer} />)
        } else if(this.props.component === Feedback) {
            this.componentList = this.props.list.map(card => <Feedback key={card.id} {...card} postedBy={(card.anonymous) ? "Anonymous" : card.postedBy.name} />)
        } else if(this.props.component === Announcement) {
            this.componentList = this.props.list.map(card => <Announcement key={card.id} {...card} />)
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