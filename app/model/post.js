var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        text: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        },
    });
    return mongoose.model('Post', schema);
}();