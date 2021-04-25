const express = require('express');
const QuestionAndAnswer = require('../../models/question_answer').QuestinAndAnswer;
const createError = require('http-errors');
const { QuestionAndAnswerServices, VOTE, BOOKMARK } = require('../../services/question_answer');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
require('firebase/storage');
const mime = require('mime-types');
global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
var fs = require('fs');

const Serializer = require('../../serializers/serializer');

module.exports = {
    vote: async (req, res) => {
        var questionAndAnswerId;
        if ('questionId' in req.params) {
            questionAndAnswerId = req.params.questionId;
        } else {
            res.status(400).send("questionId absent");
        }

        if ('answerId' in req.params) {
            questionAndAnswerId = req.params.answerId;
        }

        var action;
        if ('action' in req.query) {
            action = VOTE.get(req.query.action);
        } else if ('action' in req.body) {
            action = VOTE.get(req.body.action);
        } else {
            res.status(400).send("action absent");
        }

        await QuestionAndAnswerServices.vote(req.user, questionAndAnswerId, action).then((question) => {
            res.status(200).json(Serializer.serialize("question", question));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        });
    },
    bookmark: async (req, res) => {
        var questionAndAnswerId;
        if ('questionId' in req.params) {
            questionAndAnswerId = req.params.questionId;
        } else {
            res.status(400).send("questionId absent");
        }

        if ('answerId' in req.params) {
            questionAndAnswerId = req.params.answerId;
        }

        var action;
        if ('action' in req.query) {
            action = BOOKMARK.get(req.query.action);
        } else if ('action' in req.body) {
            action = BOOKMARK.get(req.body.action);
        } else {
            res.status(400).send("action absent");
        }

        await QuestionAndAnswerServices.bookmark(req.user, questionAndAnswerId, action).then((user) => {
            res.status(200).json();
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        });
    },
    attachment: (req, res) => {
        let questionAndAnswerId;
        let attachmentId;
        if ('answerId' in req.params) {
            questionAndAnswerId = req.params.answerId;
        }
        else if ('questionId' in req.params) {
            questionAndAnswerId = req.params.questionId;
        } else {
            res.status(400).send();
        }

        if ('attachmentId' in req.params) {
            attachmentId = req.params.attachmentId;
        } else {
            res.status(400).send();
        }

        QuestionAndAnswer.findOne({ _id: questionAndAnswerId }).then((questionAndAnswer) => {
            if (questionAndAnswer.attachments.some(item => item.id === attachmentId) == false) {
                res.status(400).send();
            }
            console.log("started");
            let storage = admin.storage().bucket(process.env.DATABASE_URL);

            let attachment = questionAndAnswer.attachments.find(item => item.id === attachmentId);

            let fileDir = `tmp/questionAndAnswer/${questionAndAnswerId}`;
            let fileName = `${fileDir}/${attachment.id}.${attachment.format}`;

            if (!fs.existsSync(fileDir)){
                fs.mkdirSync(fileDir, {recursive: true});
            }
            
            storage.file(`questionAndAnswer/${questionAndAnswerId}/${attachment.id}.${attachment.format}`).download({destination: fileName}).then(() => {
                res.sendFile(fileName, { root: '.' });
            }).catch((err) => {
                console.log(err);
                res.status(500).json();
            })

        })
    },
    newAttachment: (req, res) => {
        let questionAndAnswerId;
        if ('answerId' in req.params) {
            questionAndAnswerId = req.params.answerId;
        }
        else if ('questionId' in req.params) {
            questionAndAnswerId = req.params.questionId;
        } else {
            res.status(400).send();
        }

        QuestionAndAnswer.findOne({ _id: questionAndAnswerId }).then((questionAndAnswer) => {
            let storage = admin.storage().bucket(process.env.DATABASE_URL);

            console.log(req.files);


            promises = req.files.map(async (file) => {
                return new Promise((resolve, reject) => {
                    let attachment = {
                        id: mongoose.Types.ObjectId(),
                        format: mime.extension(file.mimetype),
                    }


                    storage.upload(file.path, {destination: `questionAndAnswer/${questionAndAnswerId}/${attachment.id}.${attachment.format}`}).then((snapshot) => {
                        questionAndAnswer.attachments.push(attachment);
                        resolve();
                    }).catch((err) => {
                        console.log(err);
                        reject()
                    })

                })
            })

            Promise.all(promises).then(() => {
                questionAndAnswer.save();
                if ('answerId' in req.params) {
                    res.status(201).json(Serializer.serialize("answer", questionAndAnswer));
                }
                else {
                    res.status(201).json(Serializer.serialize("question", questionAndAnswer));
                }
            })

        })
    }
}