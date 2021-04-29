const QuestionAndAnswer = require("../models/question_answer").QuestinAndAnswer;
const User = require("../models/user.js");
const createError = require('http-errors')
const ObjectId = require('mongoose').Types.ObjectId;

const Enum = require('enum');

const VOTE = new Enum(['upvote', 'downvote', 'cancel']);

const BOOKMARK = new Enum(['bookmark', 'cancel']);

class QuestionAndAnswerServices {
    static async vote(user, questionId, action) {
        return new Promise((resolve, reject) => {

            let type = "question";
            QuestionAndAnswer.findOne({ _id: questionId }).then((questionAndAnswer) => {
                type = questionAndAnswer.__t.toLowerCase();
            })

            let userUpdateQuery = {};
            let questionAndAnswerUpdateQuery = {}

            let pullUserDownvoted = {
                [`${type}Downvoted`]: { $filter: { input: `$${type}Downvoted`, cond: { $ne: [ObjectId(questionId), '$$this'] } } }
            };
            let pushUserDownvoted = {
                [`${type}Downvoted`]: { $setUnion: [`$${type}Downvoted`, [ObjectId(questionId)]] }
            };
            let pullUserUpvoted = {
                [`${type}Upvoted`]: { $filter: { input: `$${type}Upvoted`, cond: { $ne: [ObjectId(questionId), '$$this'] } } }
            };
            let pushUserUpvoted = {
                [`${type}Upvoted`]: { $setUnion: [`$${type}Upvoted`, [ObjectId(questionId)]] }
            };

            if (action === VOTE.upvote) {
                userUpdateQuery = {
                    $set: {
                        ...pushUserUpvoted,
                        ...pullUserDownvoted
                    }
                };
                questionAndAnswerUpdateQuery = [
                    {$set: {
                        usersUpvoted: { $setUnion: ['$usersUpvoted', [user._id]], },
                        usersDownvoted: { $filter: { input: '$usersDownvoted', cond: { $ne: [user._id, '$$this'] } } }
                    }},
                    {$set: {
                        upvotes: {$subtract: [{$size: '$usersUpvoted'}, {$size: '$usersDownvoted'}]}
                    }}
                ];
            }
            else if (action === VOTE.downvote) {
                userUpdateQuery = {
                    $set: {
                        ...pullUserUpvoted,
                        ...pushUserDownvoted
                    }
                };
                questionAndAnswerUpdateQuery = [
                    {$set: {
                        usersDownvoted: { $setUnion: ['$usersDownvoted', [user._id]], },
                        usersUpvoted: { $filter: { input: '$usersUpvoted', cond: { $ne: [user._id, '$$this'] } } }
                    }},
                    {$set: {
                        upvotes: {$subtract: [{$size: '$usersUpvoted'}, {$size: '$usersDownvoted'}]}
                    }}
                ];
            }
            else if (action === VOTE.cancel) {
                userUpdateQuery = {
                    $set: {
                        ...pullUserUpvoted,
                        ...pullUserDownvoted
                    }
                };
                questionAndAnswerUpdateQuery = [
                    {$set: {
                        usersDownvoted: { $filter: { input: '$usersDownvoted', cond: { $ne: [user._id, '$this'] } } },
                        usersUpvoted: { $filter: { input: '$usersUpvoted', cond: { $ne: [user._id, '$$this'] } } }
                    }},
                    {$set: {
                        upvotes: {$subtract: [{$size: '$usersUpvoted'}, {$size: '$usersDownvoted'}]}
                    }}
                ];
            }
            console.log(questionAndAnswerUpdateQuery);
            let promises = [
                User.updateOne({ _id: user.id }, [userUpdateQuery]),
                QuestionAndAnswer.updateOne({ _id: questionId }, [...questionAndAnswerUpdateQuery])
            ];
            Promise.all(promises).then((userRes, questionAndAnswerRes) => {
                QuestionAndAnswer.findOne({ _id: questionId }).then((questionAndAnswer) => {
                    resolve(questionAndAnswer);
                })
            })
        })
    }

    static async bookmark(user, questionId, action) {
        return new Promise((resolve, reject) => {

            let type = "question";
            QuestionAndAnswer.findOne({ _id: questionId }).then((questionAndAnswer) => {
                type = questionAndAnswer.__t.toLowerCase();
            })

            let userUpdateQuery = {};

            let pullUserBookmark = {
                [`${type}Bookmarks`]: { $filter: { input: `$${type}Bookmarks`, cond: { $ne: [ObjectId(questionId), '$$this'] } } }
            };
            let pushUserBookmark = {
                [`${type}Bookmarks`]: { $setUnion: [`$${type}Bookmarks`, [ObjectId(questionId)]] }
            };

            if (action === BOOKMARK.bookmark) {
                userUpdateQuery = {
                    $set: {
                        ...pushUserBookmark
                    }
                };
            }
            else if (action === BOOKMARK.cancel) {
                userUpdateQuery = {
                    $set: {
                        ...pullUserBookmark
                    }
                };
            }

            User.updateOne({ _id: user.id }, [userUpdateQuery]).then(() => {
                resolve();
            })
        })
    }
}

module.exports = { QuestionAndAnswerServices, VOTE, BOOKMARK };