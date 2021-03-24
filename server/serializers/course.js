const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const CourseSerializer = new JSONAPISerializer('courses', {
    attributes:['title', 'description', 'teachers', 'registeredUsers'],
    teacher: {
        ref: '_id',
        included: false,
    },
    registeredUsers: {
        ref: '_id',
        inluded: false,
    },
    typeForAttribute: (attribute, data) =>{
        console.log(attribute, data);
        return data.customType;
    },
    keyForAttribute: 'camelCase',
});

module.exports = CourseSerializer;