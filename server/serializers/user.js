const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const UserSerializer = new JSONAPISerializer('users', {
    attributes:['displayName', 'name', 'photos', 'registeredCourses'],
    registeredCourses: {
        ref: 'id',
        attributes: ['id'],
        included: false,
    },
    typeForAttribute: (attribute, data) => {
        if (attribute === 'registeredCourses') return 'courses';
    },
    keyForAttribute: 'camelCase',
});

module.exports = UserSerializer;