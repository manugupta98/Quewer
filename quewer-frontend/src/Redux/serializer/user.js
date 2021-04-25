const Serializer = require('./serializer');

Serializer.register("user", {
    whitelist: ['displayName', 'name', 'photos', 'registeredCourses', 'questionUpvoted', 'questionDownvoted', 'questionBookmarks', 'type'],
    relationships: {
        questionUpvoted: {
            type: "question",
        },
        questionDownvoted: {
            type: "question",
        },
        questionBookmarks: {
            type: "question",
        },
        registeredCourses: {
            type: "course",
        },
    },
})