import React from "react";
import Button from "../Button/Button";
import InfoDisplay from "../InfoDisplay/InfoDisplay";
import "./DisplayCard.css";

export default function DisplayCard() {
  return (
    <div className="container-fluid">
      <div className="row float-top">
        <div className="card bg-white text-white">
          <div id="grad"> </div>
          <div className="card-img-overlay cardContent">
            <h5 className="card-title"> Card title </h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural lead
              - in to additional content.This content is a little bit longer.
            </p>
            <p className="card-text"> Last updated 3 mins ago </p>
            <div className="container-fluid float-left">
              <div className="row float-left">
                <div className="col-4 float-left">
                  <InfoDisplay value="1237" name="questions"/>
                </div>
                <div className="col-4 float-left">
                  <InfoDisplay value="352" name="answers"/>
                </div>
                <div className="col-4 float-left">
                  <InfoDisplay value="854" name="views"/>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="mt-4 col-md-12"> </div>
              </div>
            </div>
            <div className="container-fluid float-left">
              <div className="row float-left">
                <div className="col-6 float-left">
                  <Button value="Ask A Question"/>
                </div>
                <div className="col-6 float-left">
                  <Button value="Mail instructor"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
