const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({

    name : {

        type : String,
        required : true
    },

    phoneno : {

        type : String,
        required : true
    },

    profession : {
        type : String  , 
        default : "consumer"
    }

});


module.exports = mongoose.model('User' , userSchema)