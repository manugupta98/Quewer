const Serializer = require('./serializer');

Serializer.register("announcement", {
    whitelist: ['title', 'description', 'postedBy', 'course', 'comments', 'attachments', 'date'],
    relationships: {
        course: {
            type: "course",
        },
        postedBy: {
            type: "user",
        },
        comments: {
            type: "comments"
        },
        attachments: {
            type: "attachment"
        },
    },
})