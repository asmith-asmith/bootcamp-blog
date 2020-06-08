var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});


var listSchema = new Schema({
    title: String,
    category: {
        type: String,
        default: "General"
    },
    content: String,
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