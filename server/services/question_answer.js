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

                let upvotesList;
                let downvotesList

                if (questionAndAnswer.__t === 'Question'){
                    upvotesList = user.questionUpvoted;
                    downvotesList = user.questionDownvoted;
                }
                else{
                    upvotesList = user.answerUpvoted;
                    downvotesList = user.answerDownvoted;
                }

                if (action === VOTE.upvote){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id) == false){
                        questionAndAnswer.usersUpvoted.push(user.id,);
                        upvotesList.push(questionId,);
                        questionAndAnswer.upvotes++; 
                    }
                    if (questionAndAnswer.usersDownvoted.some(item => item == user.id)){
                        questionAndAnswer.usersDownvoted.remove(user.id,);
                        downvotesList.remove(questionId,);
                        questionAndAnswer.upvotes--;
                    }
                }
                else if (action === VOTE.downvote){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id)){
                        questionAndAnswer.usersUpvoted.remove(user.id,);
                        upvotesList.remove(questionId,);
                        questionAndAnswer.upvotes--;
                    }
                    if (questionAndAnswer.usersDownvoted.some(item => item == user.id) == false){
                        questionAndAnswer.usersDownvoted.push(user.id,);
                        downvotesList.push(questionId,);
                        questionAndAnswer.upvotes--;
                    }
                }
                else if (action === VOTE.cancel){
                    if (questionAndAnswer.usersUpvoted.some(item => item == user.id)){
                        questionAndAnswer.usersUpvoted.remove(user.id,);
                        upvotesList.remove(questionId,);
                        questionAndAnswer.upvotes--;
                    }else if (questionAndAnswer.usersDownvoted.some(item => item == user.id)){
                        questionAndAnswer.usersDownvoted.remove(user.id,);
                        downvotesList.remove(questionId,);
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

                let bookmarksList;

                if (questionAndAnswer.__t === 'Question'){
                    bookmarksList = user.questionBookmarks;
                }
                else{
                    bookmarksList = user.answerBookmarks;

                }

                if (action === BOOKMARK.bookmark){
                    if (bookmarksList.some(item => item == questionId) == false){
                        bookmarksList.push(questionId,);
                    }
                }
                else if (action === BOOKMARK.cancel){
                    if (bookmarksList.some(item => item == questionId)){
                        bookmarksList.remove(questionId,);
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