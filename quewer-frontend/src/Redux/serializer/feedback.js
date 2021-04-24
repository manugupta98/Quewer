const Serializer = require('./serializer');

Serializer.register("feedback", {
    whitelist: ['title', 'comment', 'rating', 'postedBy', 'course', 'anonymous', 'date'],
    relationships: {
        course: {
            type: "course",
        },
        postedBy: {
            type: "user",
        },
    },
    beforeSerialize: (data) => {
        if (data.anonymous){
            data.postedBy = undefined;
        }
        return data;
    }
})