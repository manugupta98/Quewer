const express = require('express');
const announcementRouter = express.Router();
// const announcementController = require('../controllers/announcement');
const authMiddleware = require('../middleware/auth');

// announcementRouter.post('/courses/:course/announcments', authMiddleware.isAuthenticated, announcmentController.newAnnouncment);

// announcementRouter.get('/courses/:course/announcments/:announcment', authMiddleware.isAuthenticated, announcmentController.announcment);

// announcementRouter.delete('/courses/:course/announcments/:announcment', authMiddleware.isAuthenticated, announcmentController.deleteAnnouncment);

// announcementRouter.post('/courses/:course/announcments/:announcment/comment', authMiddleware.isAuthenticated, announcmentController.comment);

module.exports = announcementRouter;