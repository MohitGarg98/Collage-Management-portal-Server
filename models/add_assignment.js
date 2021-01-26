const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String,
    pdf: String,
    deadline: String
});

module.exports = new mongoose.model('Assignment', assignmentSchema);