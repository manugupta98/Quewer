const Serializer = require('./serializer');

Serializer.register('question', {
    id: "id",
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
});