const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const announcementSchema = new mongoose.Schema({
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    postedBy: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name:{
            type: String,
            required: true
        },
        photos: [{
            value: {
                type: String,
                required: true
            },
        }],
        type: {
            type: String,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    attachments: [{
        id:{
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        format:{
            type: String,
            required: true,
            validate (value) {
                if (!['pdf', 'png', 'jpeg'].includes(value)){
                    throw new Error('Attachment type not supported');
                }
            }
        }
    }],
    comments: [{
        date: {
            type: Date,
            required: true
        },
        comment: {
            type: String,
            required: true,
        },
        postedBy: {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name:{
                type: String,
                required: true
            },
            photos: [{
                value: {
                    type: String,
                    required: true,
                },
            }],
            type: {
                type: String,
                required: true
            }
        },
    }],
})

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;