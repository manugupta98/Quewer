const express = require('express');
const Announcement = require('../../models/announcement');
const createError = require('http-errors');

const Serializer = require('../../serializers/serializer');

module.exports = {
    announcement: (req, res) => {
        filter = {};
        if ('courseId' in req.params){
            filter = {course: req.params.courseId};
        }
        if ('announcementId' in req.params){
            filter = {
                ...filter,
                _id: req.params.announcementId,
            };
        }
        Announcement.find(filter).then((announcements) => {
            res.send(Serializer.serialize("announcement", announcements));
        }).catch((err) => {
            res.status(500).send();
        })
    },
    newAnnouncement: (req, res) => {
        let user = req.user;
        Serializer.deserializeAsync("announcement", req.body).then((announcementJSON)=>{
            announcementJSON.postedBy = {id: user.id, name: user.displayName, photos: user.photos, type: user.type};
            Announcement.create(announcementJSON).then((announcement) => {
                res.status(201).json(Serializer.serialize("announcement", announcement));
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
}