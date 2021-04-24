const express = require('express');
const announcementRouter = express.Router();
const announcementController = require('../controllers/announcement');
const authMiddleware = require('../middleware/auth');

announcementRouter.post('/courses/:courseId/announcements', authMiddleware.isAuthenticated, announcementController.newAnnouncement);

announcementRouter.get('/courses/:courseId/announcements', authMiddleware.isAuthenticated, announcementController.announcement);

announcementRouter.get('/courses/:courseId/announcements/:announcementId', authMiddleware.isAuthenticated, announcementController.announcement);

// announcementRouter.delete('/courses/:courseId/announcments/:announcmentId', authMiddleware.isAuthenticated, announcementController.deleteAnnouncment);

// announcementRouter.post('/courses/:courseId/announcments/:announcementId/comment', authMiddleware.isAuthenticated, announcementController.comment);

module.exports = announcementRouter;