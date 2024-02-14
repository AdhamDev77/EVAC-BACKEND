const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    favorites: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Property'
        }
      ]
}, {timestamps: true})

module.exports = mongoose.model('Users', usersSchema)