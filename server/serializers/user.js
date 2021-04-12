const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const Course = require('../models/course')

const UserSerializer = new JSONAPISerializer('users', {
    attributes:['displayName', 'name', 'photos', 'registeredCourses'],
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
        ref: 'id',
        included: true,
    },
    questionDownvoted: {
        ref: 'id',
        included: true,
    },
    questionBookmarks: {
        ref: 'id',
        included: true,
    },
    typeForAttribute: (attribute, data) => {
        if (attribute === 'registeredCourses') return 'courses';
    },
    keyForAttribute: 'camelCase',
});

module.exports = UserSerializer;