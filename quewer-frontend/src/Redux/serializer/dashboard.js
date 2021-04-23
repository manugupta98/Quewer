const Serializer = require('./serializer');

Serializer.register("graph", {
    whitelist: ['date', 'count'],
});