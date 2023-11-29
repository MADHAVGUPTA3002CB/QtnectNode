const User = require('../model/User')

const handleNewUser = async (req , res) =>{
    const {name , phone , profession } = req.body;

    const duplicate = await User.findOne({phoneno : phone}).exec();


    if(!duplicate){


        const result = await User.create({
            "name" : name,
        
            "phoneno" : phone,
        
            "profession" : profession
        })


        console.log(result)
        res.status(201).json({'success':`new ${name} created`})
    }else{
        const result = await User.findOneAndUpdate(
            { phoneno: phone },
            { $set: { name, profession } },
            { new: true } // Return the updated document
        ).exec();

        console.log(result);
        res.status(200).json({ success: `User ${name} updated` });
    }
}

module.exports = {handleNewUser};