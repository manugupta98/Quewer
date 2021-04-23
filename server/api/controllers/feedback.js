const express = require('express');
const Feedback = require('../../models/feedback');
const createError = require('http-errors');

const Serializer = require('../../serializers/serializer');

module.exports = {
    feedback: (req, res) => {
        filter = {};
        if ('courseId' in req.params){
            filter = {course: req.params.courseId};
        }
        if ('feedbackId' in req.params){
            filter = {
                ...filter,
                _id: req.params.feedbackId,
            };
        }
        Feedback.find(filter).then((feedbacks) => {
            res.send(Serializer.serialize("feedback", feedbacks));
        }).catch((err) => {
            res.status(500).send();
        })
    },
    newFeedback: (req, res) => {
        let user = req.user;
        Serializer.deserializeAsync("feedback", req.body).then((feedbackJSON)=>{
            feedbackJSON.postedBy = {id: user.id, name: user.displayName, photos: user.photos, type: user.type};
            Feedback.create(feedbackJSON).then((feedback) => {
                res.status(201).json(Serializer.serialize("feedback", feedback));
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
}