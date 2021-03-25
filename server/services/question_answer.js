const QuestionAndAnswer = require("../models/question_answer").QuestinAndAnswer;
const User = require("../models/user.js");
const createError = require('http-errors')

const Enum = require('enum');

const VOTE = new Enum(['upvoe', 'downvote', 'cancel']);

class QuestionAndAnswerServices{
    static async vote(user, questionId, action){
        return new Promise((resolve, reject) => {
            QuestionAndAnswer.findOne({_id: questionId}).then((questionAndAnswer) => {

                // @todo change to mongoose operations for synchronous upvotes

                if (action === VOTE.upvote){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id) == false){
                        questionAndAnswer.usersUpvoted.push(user.id,);
                        questionAndAnswer.upvotes++;
                    }
                    if (questionAndAnswer.usersDownvoted.some(item => item == user.id)){
                        questionAndAnswer.usersDownvoted.remove(user.id,);
                        questionAndAnswer.upvots--;
                    }
                }
                else if (action === VOTE.downvote){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id)){
                        questionAndAnswer.usersUpvoted.remove(user.id,);
                        questionAndAnswer.upvotes--;
                    }
                    if (questionAndAnswer.usersDownvoted.some(item => item == user.id) == false){
                        questionAndAnswer.usersDownvoted.push(user.id,);
                        questionAndAnswer.upvotes--;
                    }
                }
                else if (action === VOTE.cancel){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id)){
                        questionAndAnswer.usersUpvoted.remove(user.id,);
                        questionAndAnswer.upvotes--;
                    }else if (questionAndAnswer.usersDownvoted.some(item => item == user.id)){
                        questionAndAnswer.usersDownvoted.remove(user.id,);
                        questionAndAnswer.upvotes++;
                    }
                }

                questionAndAnswer.save();
                console.log(questionAndAnswer);
                resolve(questionAndAnswer);
            })
        })
    }
}

module.exports = {QuestionAndAnswerServices, VOTE};