const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const Serializer = require('./serializer');

Serializer.register("course", {
    id: "id",
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