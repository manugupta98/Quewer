const express = require('express');
const User = require('../../models/user');
const createError = require('http-errors');

module.exports = {
    userInfo: async (req, res) => {
        if (req.user){
            res.send(req.user)
        }
    }
}