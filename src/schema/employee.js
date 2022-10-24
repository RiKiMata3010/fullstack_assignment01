const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String
    },
    gender: {
        type: String
    },
    salary: {
        type: Number
    }
});

const Employee = mongoose.model('employee', employeeSchema);
module.exports = Employee;