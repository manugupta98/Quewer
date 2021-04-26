const Login = require("../../models/login");
const moment = require("moment");

module.exports = {
    loginStats: (req, res, next) => {
        const start = moment().startOf('day').toDate()
        const end = moment().endOf('day').toDate()
        Login.findOneAndUpdate(
            {
                'user': req.user.id,
                'type': req.user.type,
                'created': { '$gte': start, '$lte': end }
            },
            {
                '$setOnInsert': { 'user': req.user.id, 'type': req.user.type, 'created': moment().toDate() }
            },
            {
                'upsert': true,
                'new': true
            },
        ).then((login) => {
            console.log(login);
        }).catch((err) => {
            console.log(err);
        })
        next();
    }
}