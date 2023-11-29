const UserContacts = require('../model/usercontacts')

const addContacts = async (req , res)=>{

    const { name , phoneNo , contacts } = req.body

    const userExists = await UserContacts.findOne({phoneNo : phoneNo}).exec();

    if(userExists){
        const result = await UserContacts.findOneAndUpdate(
            { phoneNo: phoneNo },
            { $set: { contacts } },
            { new: true } // Return the updated document
        ).exec();

        console.log(result);
        res.status(200).json({ success: `contacts has been added` });
    }else{
        const result = await UserContacts.create({
            "name" : name,
        
            "phoneNo" : phoneNo,
        
            "contacts" : contacts
        })

        console.log(result)
        res.status(201).json({'success':`new ${name} created`})
    }
}

const getContacts = async (req , res)=>{

    const {phoneNo} = req.body
    console.log("reaches here12313");

    const userExists = await UserContacts.findOne({phoneNo : phoneNo}).exec();

    if(userExists){

        console.log("reaches here");
        res.status(201).json({ 'contacts': userExists.contacts });
    }else{

        console.log("reached but no data found")
        res.status(201).json({'contacts':`no user found`})
    }
}

module.exports = {addContacts , getContacts}