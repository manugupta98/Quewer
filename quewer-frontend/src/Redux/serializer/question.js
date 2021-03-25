const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

const QuestionSerializer = new JSONAPISerializer('questions', {
    attributes:['course', 'postedBy', 'title', 'description', 'date', 'upvotes', 'attachments', 'tags', 'answers'],
    course: {
        ref: 'id',
        included: true,
    },
    postedBy: {
        ref: 'id',
        included: true,
    },
    typeForAttribute: (attribute, data) =>{
        return data.customType;
    },
    keyForAttribute: 'camelCase',
});

const QuestionDeserializer = new JSONAPIDeserializer({
    keyForAttribute: 'camelCase',
    postedBies: {
        valueForRelationship: (relationship) => {
            console.log(relationship);
            return relationship.id;
        }
    },
    courses: {
        valueForRelationship: (relationship) => {
            console.log(relationship);
            return relationship.id;
        }
    }
});



module.exports = {QuestionSerializer, QuestionDeserializer};