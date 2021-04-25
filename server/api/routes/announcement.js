const express = require('express');
const announcementRouter = express.Router();
const announcementController = require('../controllers/announcement');

announcementRouter.post('/courses/:courseId/announcements', announcementController.newAnnouncement);

announcementRouter.get('/courses/:courseId/announcements', announcementController.announcement);

announcementRouter.get('/courses/:courseId/announcements/:announcementId', announcementController.announcement);

// announcementRouter.delete('/courses/:courseId/announcments/:announcmentId', authMiddleware.isAuthenticated, announcementController.deleteAnnouncment);

// announcementRouter.post('/courses/:courseId/announcments/:announcementId/comment', authMiddleware.isAuthenticated, announcementController.comment);

module.exports = announcementRouter;