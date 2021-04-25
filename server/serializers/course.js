const Serializer = require('./serializer');

Serializer.register("course", {
    id: "_id",
    whitelist: ['title', 'description', 'teachers', 'registeredUsers'],
    relationships: {
        teacher: {
            type: "user",
        },
        registeredUsers: {
            type: "user",
        },
    },
})