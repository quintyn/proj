const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Project', projectSchema);
