const mongoose = require('mongoose');

const submitSchema = new mongoose.Schema({
    submit_pdf: String,
    assignment_title: String,
    assignment_pdf: String,
    grade: String
})

module.exports = new mongoose.model('SubmittedAssignment', submitSchema);