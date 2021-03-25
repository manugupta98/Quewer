const createError = require('http-errors');
const passport = require('passport');

module.exports = {
    isAuthenticated: async (req, res, next) => {
        if (req.isAuthenticated()){
            next();
        }else {
            res.status(401).send();
        }
    }
}