const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const Course = require('../models/course')

const Serializer = require('./serializer');

Serializer.register("user", {
    whitelist: ['displayName', 'name', 'photos', 'registeredCourses', 'questionUpvoted', 'questionDownvoted', 'questionBookmarks', 'answerUpvoted', 'answerDownvoted', 'answerBookmarks', 'type'],
    relationships: {
        questionUpvoted: {
            type: "question",
        },
        questionDownvoted: {
            type: "question",
        },
        questionBookmarks: {
            type: "question",
        },
        answerUpvoted: {
            type: "answer",
        },
        answerDownvoted: {
            type: "answer",
        },
        answerBookmarks: {
            type: "answer",
        },
        registeredCourses: {
            type: "course",
        },
    },
})

Serializer.register("user", 'admin', {
    whitelist: ['displayName', 'name', 'photos', 'registeredCourses', 'questionUpvoted', 'questionDownvoted', 'questionBookmarks', 'answerUpvoted', 'answerDownvoted', 'answerBookmarks', 'type', 'emails'],
    relationships: {
        questionUpvoted: {
            type: "question",
        },
        questionDownvoted: {
            type: "question",
        },
        questionBookmarks: {
            type: "question",
        },
        answerUpvoted: {
            type: "answer",
        },
        answerDownvoted: {
            type: "answer",
        },
        answerBookmarks: {
            type: "answer",
        },
        registeredCourses: {
            type: "course",
        },
    },
})