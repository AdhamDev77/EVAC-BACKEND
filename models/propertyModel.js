const mongoose = require('mongoose')

const Schema = mongoose.Schema

const propertySchema = new Schema({
    imagesArray: {
        type: [String],
        required: true
    },
    main_image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "rent"
    },
    square: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
        default: "istanbul"
    },
    type: {
        type: String,
        required: true,
        default: "flat"
    },
    rooms: {
        type: String,
        required: true,
        default: "1+0"
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    isFurnitured: {
        type: String,
        required: true,
    },
    uploader_name: {
        type: String,
        required: true,
    },
    uploader_number: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('Property', propertySchema)