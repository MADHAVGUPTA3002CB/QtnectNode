const mongoose = require('mongoose');

const myConnection = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
});

const myContactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  contacts: [myConnection], // Array of contacts
});

module.exports = mongoose.model('UserContacts', myContactsSchema);
