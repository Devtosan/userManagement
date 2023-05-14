const mongoose = require('mongoose')
const Schema = mongoose.Schema
const customerSchema = new Schema({
    firstName : {
        type: String,
        require: 'This field is required'
    },
    lastName : {
        type: String,
        require: 'This field is required'
    },
    email : {
        type: String,
        require: 'This field is required'
    },
    tel: {
        type: String,
        require: 'This field is required'
    },
    details: {
        type: String,
        require: 'This field is required'
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()

    }
})

module.exports = mongoose.model('Customer', customerSchema)