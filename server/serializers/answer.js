const Serializer = require('./serializer');

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
    beforeSerialize: (data) => {
        if (data.anonymous){
            data.postedBy = undefined;
        }
        return data;
    }
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