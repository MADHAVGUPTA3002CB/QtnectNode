const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')


const connectDb = async()=> {
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/Qtnect")
        
    } catch (err) {
        console.log(err);
    }
}

connectDb();
const PORT = process.env.PORT || 3500;


app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use('/contacts' , require('./routes/contacts'))
app.use('/createuser' , require('./routes/userdetails'))


mongoose.connection.once('open', ()=>{
    console.log("connected to database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
