import React from "react";
import { Link } from 'react-router-dom';
import Button from '../button';
import { connect } from 'react-redux';
import "./DisplayCard.css";

function DisplayCard({name}) {
  return (
    <div className="DisplayCard">
            <h1>{name}</h1>
            <h3>When is the next one?</h3>
            <div className="QuestionStats">
                <div className="QuestionData">
                    <h3>1237</h3>
                    <h4>Questions</h4>
                </div>
                <div className="QuestionData">
                    <h3>615</h3>
                    <h4>Answers</h4>
                </div>
            </div>
            <div className="ButtonsRow">
                <Link to="/postquestion"><Button color="#618CFB" textColor="white" text="Ask a question" /></Link>
                <Button color="#618CFB" textColor="white" text="Mail instructor" />
            </div>
        </div>
  );
}

const mapStateToProps = state => ({
    numQuestions: state.course.courseList,
    numAnswers: ''
});

export default connect(mapStateToProps)(DisplayCard);