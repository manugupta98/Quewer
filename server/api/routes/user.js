const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

userRouter.get('/users', authMiddleware.isAuthenticated, userController.user);

userRouter.get('/teachers', authMiddleware.isAuthenticated, userController.teacher);

userRouter.get('/students', authMiddleware.isAuthenticated, userController.student);

userRouter.get('/users/:userId/courses', authMiddleware.isAuthenticated, userController.courses);

userRouter.get('/users/:userId/bookmarks', authMiddleware.isAuthenticated, userController.bookmarks);

userRouter.get('/users/:userId/downvotes', authMiddleware.isAuthenticated, userController.downvotes);

userRouter.get('/users/:userId/upvotes', authMiddleware.isAuthenticated, userController.upvotes);

module.exports = userRouter;