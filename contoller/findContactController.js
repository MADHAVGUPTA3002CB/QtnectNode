const mycontacts = require('../model/mycontacts')

const findcontact = async (req , res)=>{
    try {
        const { phone, profession } = req.body;
    
        // Validate input
        if (!phone || !profession) {
          return res.status(400).json({ error: 'Phone number and profession are required in the request body.' });
        }
    
        // Find the user with the specified phone number
        const user = await mycontacts.findOne({ phone });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found with the provided phone number.' });
        }
    
        // Find contacts with the specified profession
        const contactsWithProfession = user.contactsByProfession
          .find(({ profession: userProfession }) => userProfession === profession);
    
        if (!contactsWithProfession) {
          return res.status(404).json({ error: `No contacts found with profession: ${profession}` });
        }
    
        return res.json({ contacts: contactsWithProfession.friends });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {findcontact}