const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;


//TODO: attachments and comments ko serializer karna bacha hai, complex type hai woh isliye chordiya hai

const AnswerSerializer = new JSONAPISerializer('answer', {
    attributes:['course', 'postedBy', 'title', 'description', 'date', 'upvotes', 'tags', 'question'],
    course: {
        ref: '_id',
        included: false,
    },
    postedBy: {
        ref: '_id',
        inluded: false,
    },
    question: {
        ref: '_id',
        included: false,
    },
    typeForAttribute: (attribute, data) =>{
        console.log(attribute, data);
        return data.customType;
    },
    keyForAttribute: 'camelCase',
});

//TODO: Complete deserializer part

const AnswerDeserializer = new JSONAPIDeserializer({
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

module.exports = {AnswerSerializer, AnswerDeserializer};