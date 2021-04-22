var JSONAPISerializer = require("json-api-serializer");

var Serializer = new JSONAPISerializer({
    convertCase: "camelCase",
    unconvertCase: "camelCase",
});

module.exports = Serializer;

require('./question')
require('./answer')
require('./course')
require('./user')