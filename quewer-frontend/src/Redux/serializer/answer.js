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