import React, { useEffect } from 'react';
import CardList from '../card-list';
import QuestionCard from '../question-card';
import Button from '../button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AnswerPage extends React.Component {

    constructor(props) 
    {
        super(props);
        console.log(props);
        this.state = {
            card: this.props.location.state.question[0],
            courseID: this.props.location.state.courseID
        }
    }

    render() {
        return (
            <div>
                <QuestionCard style={{width: '95%'}} id={this.state.card.id} {...this.state.card} courseID={this.state.courseID} postedBy={this.state.card.postedBy.name} />
                <Link to={{pathname: `/postanswer`, state: {questionID: this.state.card.id, courseID: this.state.courseID}}} className='q-question' style={{textDecoration: 'none', color: 'black'}} >
                    <Button color='#29348EEE' textColor='white' text='Post an Answer' margin='0px 20px' />
                </Link>
                <hr />
                { (this.props.answerList.length > 0) ? <h1 style={{margin: '0 5%'}}>Answers</h1> : null }
                { (this.props.answerList.length > 0) ? <CardList component={QuestionCard} list={this.props.answerList} answer /> : <h3 style={{textAlign: 'center', }}>No answers yet!</h3> }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    answerList: state.course.currentAnswers
});

export default connect(mapStateToProps)(AnswerPage);