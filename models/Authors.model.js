const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    biography: {
        type: String,
        trim: true
    },
    genres: [{
        type: String,
        trim: true
    }],
    nationality: {
        type: String,
        trim: true
    },
    birthDate: {
        type: Date
    },
    publications: [{
        title: {
            type: String,
            required: true
        },
        year: {
            type: Number
        },
        publisher: {
            type: String
        }
    }],
    contactInfo: {
        phone: String,
        address: String,
        website: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
const Author=mongoose.model('Author', authorSchema)
module.exports = Author;