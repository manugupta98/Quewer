import React from "react";
import { Link } from 'react-router-dom';
import "./DisplayCard.css";

export default function DisplayCard() {
  return (
    <div className="DisplayCard">
            <h1>Solar eclipses:</h1>
            <h1>When is the next one?</h1>
            <div className="QuestionStats">
                <div className="QuestionData">
                    <h3>1237</h3>
                    <h4>Questions</h4>
                </div>
                <div className="QuestionData">
                    <h3>615</h3>
                    <h4>Answers</h4>
                </div>
                <div className="QuestionData">
                    <h3>90K</h3>
                    <h4>Views</h4>
                </div>
            </div>
            <div className="ButtonsRow">
                <Link to="/postquestion"><button className="Buttons">Ask a Question</button></Link>
                <button className="Buttons">Mail Instructor</button>
            </div>
        </div>
  );
}
