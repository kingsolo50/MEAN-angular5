const   express = require('express'),
        mongoose = require('mongoose'),
        bcrypt = require('bcrypt-nodejs'),
        dbconnection = require('../config/databaseConnection'),
        Schema = mongoose.Schema;
        mongoose.Promise = global.Promise; // Configure Mongoose Promises

/* User Schema Object */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    }
}, { timestamps: true });

// Schema Middleware to Encrypt Password
userSchema.pre('save', function (next) {
    var userSchema = this;
    // Ensure password is new or modified before applying encrtption
    if (!this.isModified('password'))
        return next();

    // Apply encryption
    bcrypt.hash('password', null, null, function(err, hash) {
        if (err) return next(err);
        userSchema.password = hash;
        next();
    });

});
// Validating password - creating custom method for the database
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('userModel', userSchema);