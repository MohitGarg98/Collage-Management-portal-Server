const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const teacherSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String 
})

const secret = "thisisoursecret";
teacherSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;