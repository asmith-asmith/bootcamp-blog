var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    content: String,
    commentorName: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});


var listSchema = new mongoose.Schema({
    title: String,
    list: [{type: String}],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('List', listSchema);