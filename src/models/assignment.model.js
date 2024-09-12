const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'completed', 'overdue'],
        default: 'pending'
    },
})

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;