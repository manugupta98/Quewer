const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

userRouter.get('/users', authMiddleware.isAuthenticated, userController.userInfo);

userRouter.get('/users/:user/courses', authMiddleware.isAuthenticated, userController.courses);

userRouter.get('/users/:user/bookmarks', authMiddleware.isAuthenticated, userController.bookmarks);

userRouter.get('/users/:user/downvotes', authMiddleware.isAuthenticated, userController.downvotes);

userRouter.get('/users/:user/upvotes', authMiddleware.isAuthenticated, userController.upvotes);

module.exports = userRouter;