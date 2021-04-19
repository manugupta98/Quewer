const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const Course = require('../models/course')

const UserSerializer = new JSONAPISerializer('users', {
    attributes:['displayName', 'name', 'photos', 'registeredCourses', 'questionUpvoted', 'questionDownvoted', 'questionBookmarks'],
    registeredCourses: {
        ref: 'id',
        included: true,
        attributes: ['id', 'title', 'teacher',],
        teacher: {
            ref: '_id',
            included: false,
        },
    },
    questionUpvoted: {
        ref: '_id',
        included: false,
    },
    questionDownvoted: {
        ref: '_id',
        included: false,
    },
    questionBookmarks: {
        ref: '_id',
        included: false,
    },
    typeForAttribute: (attribute, data) => {
        if (attribute === 'registeredCourses') return 'courses';
    },
    keyForAttribute: 'camelCase',
});

module.exports = UserSerializer;