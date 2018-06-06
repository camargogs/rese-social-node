var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    });
    return mongoose.model('User', schema);
}();