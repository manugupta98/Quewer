const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

const Serializer = require('./serializer');
//TODO: attachments and comments ko serializer karna bacha hai, complex type hai woh isliye chordiya hai

Serializer.register("answer", {
    id: "_id",
    whitelist: ['course', 'postedBy', 'title', 'description', 'date', 'upvotes', 'tags', 'question', 'attachments', 'comments'],
    relationships: {
        course: {
            type: "course",
        },
        postedBy: {
            type: "user",
        },
        question: {
            type: "question"
        },
        comments: {
            type: "comments"
        },
        attachments: {
            type: "attachment"
        },
    },
})

Serializer.register("attachment", {
    id: "id",
    whitelist: ['format'],
})

Serializer.register("comments", {
    id: "_id",
    whitelist: ['postedBy', 'date', 'comment'],
    relationships: {
        postedBy: {
            type: "user",
        },
    },
})

const AnswerSerializer = new JSONAPISerializer('answer', {
    attributes: ['course', 'postedBy', 'title', 'description', 'date', 'upvotes', 'tags', 'question', ],
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
    question: {
        valueForRelationship: (relationship) => {
            console.log(relationship);
            return relationship.id;
        }
    }
});

module.exports = {AnswerSerializer, AnswerDeserializer};