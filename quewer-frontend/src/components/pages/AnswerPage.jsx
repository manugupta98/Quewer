import React, { useEffect } from 'react';
import CardList from '../card-list';
import QuestionCard from '../question-card';

class AnswerPage extends React.Component {

    constructor(props) 
    {
        super(props);
        console.log(props);
        this.state = {
            card: this.props.location.state.question[0],
            answerList: this.props.location.state.question[0].attributes.answers
        }
    }

    render() {
        return (
            <div>
                <QuestionCard style={{width: '95%'}} id={this.state.card.id} {...this.state.card.attributes} postedBy={this.state.card.relationships.postedBy.data.id}  />
                <hr />
                { (this.state.answerList > 0) ? <h1 style={{margin: '0 5%'}}>Answers</h1> : null }
                { (this.state.answerList.length > 0) ? <CardList component={QuestionCard} list={this.state.answerList} answer /> : <h3 style={{textAlign: 'center', }}>No answers yet!</h3> }
            </div>
        );
    }
}

export default AnswerPage;