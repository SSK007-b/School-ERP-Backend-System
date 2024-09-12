const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignmentId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Assignment',
    },
    studentId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Student',
    },
    content:{
        type: String,
        required: true,
    },
    grade:{
        type: String,
    },
    status:{
        type: String,
        enum: ['pending', 'submitted'],
        default: 'pending',
    },
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
