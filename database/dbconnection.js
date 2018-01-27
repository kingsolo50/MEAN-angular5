var mongoose = require('mongoose');
const mongodatabase = require('../config/databaseConnection');

/* Connect to db */
mongoose.connect(mongodatabase.database, {
    useMongoClient: true
});

/* Checking DB connection */
mongoose.connection.on('connected', () => {
    console.log('Connected to database blocklapp' + ' ' + mongodatabase.database)
})
mongoose.connection.on('error', (err) => {
    console.log('Connected to database error!!' + ' ' + err);
});

/* Mongoose Schema imports */
const userSchema = require('../model/model-user');
