const express = require('express');
const User = require('../../models/user');
const createError = require('http-errors');

module.exports = {
    userInfo: async (req, res) => {
        let userId = req.
        User.findOne({_id: userId}).then(() => {
                req.send();
            }).catch((err) => {
                throw new httpError.NotFound("User not found");
            })
    }
}