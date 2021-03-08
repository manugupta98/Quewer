const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const UserSerializer = new JSONAPISerializer('users', {
    attributes:['displayName', 'name', 'photos'],
    ref: ['registeredCourses', 'userQuestions'],
    keyForAttribute: 'camelCase',
});

module.exports = UserSerializer;