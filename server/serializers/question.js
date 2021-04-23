const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const _ = require('lodash');

const Serializer = require('./serializer');

const QuestionSerializer = new JSONAPISerializer('questions', {
    attributes: ['course', 'postedBy', 'title', 'anonymous', 'description', 'date', 'upvotes', 'attachments', 'tags', 'answers'],
    course: {
        ref: '_id',
        included: false,
    },
    postedBy: {
        ref: 'id',
        included: true,
        attributes: ['photos', 'id', 'name'],
    },
    typeForAttribute: (attribute, data) =>{
        return data.customType;
    },
    keyForAttribute: 'camelCase',
    transform: function(record) {
        if (record['anonymous']){
            var newRecord = ({...record}._doc);
            delete newRecord.postedBy;
            record = newRecord;
        }
        return record;
    },
});

const QuestionDeserializer = new JSONAPIDeserializer({
    keyForAttribute: 'camelCase',
    postedBies: {
        valueForRelationship: (relationship) => {
            return relationship.id;
        }
    },
    courses: {
        valueForRelationship: (relationship) => {
            return relationship.id;
        }
    }
});

Serializer.register('question', {
    id: "_id",
    whitelist: ['course', 'postedBy', 'title', 'anonymous', 'description', 'date', 'upvotes', 'attachments', 'tags', 'answers'],
    relationships: {
        course: {
            type: "course",
        },
        postedBy: {
            type: "user",
        },
        answers: {
            type: "answer",
        },
    },
    beforeSerialize: (data) => {
        if (data.anonymous){
            data.postedBy = undefined;
        }
        return data;
    }
});

module.exports = {QuestionSerializer, QuestionDeserializer};