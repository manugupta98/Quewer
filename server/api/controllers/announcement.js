const express = require('express');
const Announcement = require('../../models/announcement');
const createError = require('http-errors');

const Serializer = require('../../serializers/serializer');

module.exports = {
    announcement: (req, res) => {
        filter = {};
        if ('courseId' in req.params) {
            filter = { course: req.params.courseId };
        }
        if ('announcementId' in req.params) {
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
        Serializer.deserializeAsync("announcement", req.body).then((announcementJSON) => {
            announcementJSON.postedBy = { id: user.id, name: user.displayName, photos: user.photos, type: user.type };
            Announcement.create(announcementJSON).then((announcement) => {
                res.status(201).json(Serializer.serialize("announcement", announcement));
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    attachment: (req, res) => {
        let announcementId;
        let attachmentId;
        if ('announcementId' in req.params) {
            announcementId = req.params.announcementId;
        } else {
            res.status(400).send();
        }

        if ('attachmentId' in req.params) {
            attachmentId = req.params.attachmentId;
        } else {
            res.status(400).send();
        }

        Announcement.findOne({ _id: announcementId }).then((announcement) => {
            if (announcement.attachments.some(item => item.id === attachmentId) == false) {
                res.status(400).send();
            }
            console.log("started");
            let storage = admin.storage().bucket(process.env.DATABASE_URL);

            let attachment = announcement.attachments.find(item => item.id === attachmentId);

            let fileDir = `tmp/announcement/${announcementId}`;
            let fileName = `${fileDir}/${attachment.id}.${attachment.format}`;

            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, { recursive: true });
            }

            storage.file(`announcement/${announcementId}/${attachment.id}.${attachment.format}`).download({ destination: fileName }).then(() => {
                res.download(fileName, attachment.name);
            }).catch((err) => {
                console.log(err);
                res.status(500).json();
            })

        })
    },
    newAttachment: (req, res) => {

        let announcementId;
        if ('announcementId' in req.params) {
            announcementId = req.params.announcementId;
        } else {
            res.status(400).send();
        }

        Announcement.findOne({ _id: announcementId }).then((announcement) => {
            let storage = admin.storage().bucket(process.env.DATABASE_URL);

            promises = req.files.map(async (file) => {
                return new Promise((resolve, reject) => {
                    let attachment = {
                        id: mongoose.Types.ObjectId(),
                        name: file.originalname,
                        format: mime.extension(file.mimetype),
                    }


                    storage.upload(file.path, { destination: `announcements/${announcementId}/${attachment.id}.${attachment.format}` }).then((snapshot) => {
                        announcement.attachments.push(attachment);
                        resolve();
                    }).catch((err) => {
                        console.log(err);
                        reject()
                    })
                })
            })

            Promise.all(promises).then(() => {
                announcement.save();
                res.status(201).json(Serializer.serialize("announcement", announcement));
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        })
    }
}