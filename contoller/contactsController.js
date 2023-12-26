const UserContacts = require('../model/usercontacts')
const mycontacts = require('../model/mycontacts')
const User = require('../model/User')

// // updatingList
// const updatingList = async (req , res)=>{

//     const { name , phoneNo , contacts } = req.body

//     const userExists = await UserContacts.findOne({phoneNo : phoneNo}).exec();

//     if(userExists){
//         const result = await UserContacts.findOneAndUpdate(
//             { phoneNo: phoneNo },
//             { $set: { contacts } },
//             { new: true } // Return the updated document
//         ).exec();

//         console.log(result);
//         res.status(200).json({ success: `contacts has been added` });
//     }else{
//         const result = await UserContacts.create({
//             "name" : name,
        
//             "phoneNo" : phoneNo,
        
//             "contacts" : contacts
//         })

//         console.log(result)
//         res.status(201).json({'success':`new ${name} created`})
//     }


//     const userInMyContacts = await mycontacts.findOne({phone : phoneNo}).exec();

//     const uniquePhoneNumbers = new Set();

//     for(const contact of contacts){

//         const contactExist = await UserContacts.findOne({phoneNo : contact.phoneNo}).exec();

//         if(contactExist){
//             uniquePhoneNumbers.add({
//                 "phone" : contact.phoneNo
//             })
//         }
//     }

//     if(userInMyContacts){
//         userCont = userInMyContacts.contactsByProfession

//         for(const contact of userCont){
//             uniquePhoneNumbers.add(contact) 
//         }

        

//         userInMyContacts.contactsByProfession = uniquePhoneNumbers

//         const result = await userInMyContacts.save();
//         res.status(200).json({ success: `contacts has been added to mycontact collection` });

//     }
//     else{
//         const result = await mycontacts.create({
//             "phone" : phoneNo,
//             "name" : name  ,
//             "contactsByProfession" : uniquePhoneNumbers

//         })

//         console.log(result)
//         res.status(201).json({'success':`new ${name} created and added to mycontact collection`})
//     }
// }

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


const addContacts = async (req, res) => {
    const { name, phoneNo, contacts } = req.body;
    console.log(`UserphoneNo: ${phoneNo}`);
  
    try {
      // Iterate through the contacts to be updated
      for (const { name: friendName, phoneNo: friendPhoneNo } of contacts) {
        // Check if the contact exists in the userSchema
        const contactExist = await User.findOne({ phoneno: friendPhoneNo }).exec();
  
        if (contactExist) {


          // Get the profession of the contact from the userSchema
          const profession = contactExist.profession;
  
          // Use findOneAndUpdate to add the contact to the specified profession
          const result = await mycontacts.findOneAndUpdate(
            { phone: phoneNo, 'contactsByProfession.profession': profession },
            {
              $addToSet: {
                'contactsByProfession.$.friends': {  phone: friendPhoneNo },
              },
            },
            { new: true }
          );
  
          if (result) {
            console.log(`Contact added successfully for ${profession}:`, result);
          } else {
            // If the user or profession is not found, create a new entry
            const newUserContacts = await mycontacts.findOneAndUpdate(
              { phone: phoneNo },
              
             
              {
                
                $set: {
                    phone: phoneNo, // Add this line to set the phone number
                    name : name
                  },
                $addToSet: {
                  contactsByProfession: { profession, 
                                        friends: [{  phone: friendPhoneNo }] },
                },
              },
              { new: true, upsert: true } // Create a new entry if not found
            );
  
            console.log(`New entry created for ${profession}:`, newUserContacts);
          }
        } else {
          console.log(`Contact with phoneNo ${friendPhoneNo} does not exist in userSchema.`);
        }
      }
  
      res.status(200).json({ success: 'Contacts added successfully.' });
    } catch (error) {
      console.error('Error adding contacts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Use the addContacts function as your route handler or middleware


module.exports = {addContacts , getContacts}