const Serializer = require('./serializer');

Serializer.register("dashboard", {
    whitelist: ['questionsCount', 'answersCount', 'feedbacksCount', 'questionsGraph', 'answersGraph'],
})

Serializer.register("graph", {
    whitelist: ['date', 'count'],
})