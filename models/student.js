const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const studentSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String 
})

const secret = "thisisoursecret";
studentSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;