const QuestionAndAnswer = require("../models/question_answer").QuestinAndAnswer;
const User = require("../models/user.js");
const createError = require('http-errors')

const Enum = require('enum');

const VOTE = new Enum(['upvote', 'downvote', 'cancel']);

const BOOKMARK = new Enum(['bookmark', 'cancel']);

class QuestionAndAnswerServices{
    static async vote(user, questionId, action){
        return new Promise((resolve, reject) => {
            QuestionAndAnswer.findOne({_id: questionId}).then((questionAndAnswer) => {

                // @todo change to mongoose operations for synchronous upvotes

                if (action === VOTE.upvote){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id) == false){
                        questionAndAnswer.usersUpvoted.push(user.id,);
                        user.questionUpvoted.push(questionId,);
                        questionAndAnswer.upvotes++; 
                    }
                    if (questionAndAnswer.usersDownvoted.some(item => item == user.id)){
                        questionAndAnswer.usersDownvoted.remove(user.id,);
                        user.questionDownvoted.remove(questionId,);
                        questionAndAnswer.upvotes--;
                    }
                }
                else if (action === VOTE.downvote){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id)){
                        questionAndAnswer.usersUpvoted.remove(user.id,);
                        user.questionUpvoted.remove(questionId,);
                        questionAndAnswer.upvotes--;
                    }
                    if (questionAndAnswer.usersDownvoted.some(item => item == user.id) == false){
                        questionAndAnswer.usersDownvoted.push(user.id,);
                        user.questionDownvoted.push(questionId,);
                        questionAndAnswer.upvotes--;
                    }
                }
                else if (action === VOTE.cancel){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id)){
                        questionAndAnswer.usersUpvoted.remove(user.id,);
                        user.questionUpvoted.remove(questionId,);
                        questionAndAnswer.upvotes--;
                    }else if (questionAndAnswer.usersDownvoted.some(item => item == user.id)){
                        questionAndAnswer.usersDownvoted.remove(user.id,);
                        user.questionDownvoted.remove(questionId,);
                        questionAndAnswer.upvotes++;
                    }
                }

                questionAndAnswer.save();
                user.save();
                console.log(questionAndAnswer);
                resolve(questionAndAnswer);
            })
        })
    }

    static async bookmark(user, questionId, action){
        return new Promise((resolve, reject) => {
            QuestionAndAnswer.findOne({_id: questionId}).then((questionAndAnswer) => {

                // @todo change to mongoose operations for synchronous upvotes

                if (action === BOOKMARK.bookmark){
                    if (user.questionBookmarks.some(item => item == questionId) == false){
                        user.questionBookmarks.push(questionId,);
                    }
                }
                else if (action === BOOKMARK.cancel){
                    if (user.questionBookmarks.some(item => item == questionId)){
                        user.questionBookmarks.remove(questionId,);
                    }
                }

                console.log(user);
                user.save();
                resolve(user);
            })
        })
    }
}

module.exports = {QuestionAndAnswerServices, VOTE, BOOKMARK};