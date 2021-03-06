import React from "react";
import { Link } from 'react-router-dom';
import Button from '../button';
import { connect } from 'react-redux';
import "./DisplayCard.css";
import store from '../../Redux/store';
import { getAnnouncement } from "../../Redux/actions";

function DisplayCard({name, numQuestions, numAnswers}) {
  return (
    <div className="DisplayCard">
            <h1>{name}</h1>
            <h3>When is the next one?</h3>
            <div className="QuestionStats">
                <div className="QuestionData">
                    <h3>{numQuestions}</h3>
                    <h4>Questions</h4>
                </div>
                <div className="QuestionData">
                    <h3>{numAnswers}</h3>
                    <h4>Answers</h4>
                </div>
            </div>
            <div className="ButtonsRow">
                <Link to="/postquestion"><Button color="#618CFB" textColor="white" text="Ask a question" /></Link>
                <Button color="#618CFB" onClick={sendMail} textColor="white" text="Mail instructor" />
                {(store.getState().user.user.type === 'student') ? <Link to="/postfeedback"><Button color="#618CFB" textColor="white" text="Give a Feedback" /></Link> : <Link to="/postannouncement"><Button color="#618CFB" textColor="white" text="Post Announcement" /></Link>}
                {(store.getState().user.user.type === 'student') ? <Link to="/getannouncement"><Button onClick={getAnnouncements} color="#618CFB" textColor="white" text="Announcements" /></Link> : null}
            </div>
        </div>
  );
}

function sendMail() {
    window.open("mailto:example@gmail.com")
}

function sumOfAnswers(state) {
    const questions = state.course.currentCourse.questions;
    const answers = questions.map((question) => question.answers.length);
    const sum = answers.reduce((a, b) => a + b, 0);
    return sum;
}

async function getAnnouncements() {
    await store.dispatch(getAnnouncement(store.getState().course.currentCourse.id));
}

const mapStateToProps = state => ({
    numQuestions: state.course.currentCourse.questions.length,
    numAnswers: sumOfAnswers(state)
});

export default connect(mapStateToProps)(DisplayCard);