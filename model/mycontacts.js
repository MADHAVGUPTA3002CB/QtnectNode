const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
});

const myContactsSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactsByProfession: [
    {
      profession: {
        type: String,
        required: true,
      },
      friends: [
        {
          phone: {
            type: String,
            required: true,
            unique: true,
          },
        }
      ],
    },
  ],
});



module.exports = mongoose.model('mycontact', myContactsSchema);


