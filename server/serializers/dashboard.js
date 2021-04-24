const Serializer = require('./serializer');

Serializer.register("dashboard", {
    whitelist: ['questionsGraph', 'answersGraph'],
})

Serializer.register("graph", {
    whitelist: ['date', 'count'],
})