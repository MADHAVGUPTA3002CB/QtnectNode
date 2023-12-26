const mongoose = require('mongoose');
const MyContact = require('./model/mycontacts'); // Adjust the path accordingly

async function findContactsAndFriendsByPhoneNumberAndProfession(phoneNumber, profession) {
  try {
    // Find your contacts for the given phone number
    const yourContacts = await MyContact.aggregate([
      {
        $match: {
          phone: phoneNumber,
        },
      },
      {
        $project: {
          _id: 0,
          contactsByProfession: 1,
        },
      },
      {
        $unwind: '$contactsByProfession',
      },
      {
        $match: {
          'contactsByProfession.profession': profession,
        },
      },
      {
        $unwind: '$contactsByProfession.friends',
      },
      {
        $project: {
          friendPhone: '$contactsByProfession.friends.phone',
        },
      },
    ]);

    // Extract phone numbers of your contacts and friends
    const yourContactAndFriendsPhoneNumbers = [...new Set(yourContacts.map(contact => contact.friendPhone))];
    yourContactAndFriendsPhoneNumbers.push(phoneNumber);

    // Find friends of friends for the given phone number and profession
    const friendsOfFriends = await MyContact.aggregate([
      {
        $match: {
          'contactsByProfession.profession': profession,
          'contactsByProfession.friends.phone': { $in: yourContactAndFriendsPhoneNumbers },
        },
      },
      {
        $unwind: '$contactsByProfession',
      },
      {
        $unwind: '$contactsByProfession.friends',
      },
      {
        $match: {
          'contactsByProfession.friends.phone': { $nin: yourContactAndFriendsPhoneNumbers },
        },
      },
      {
        $project: {
          _id: 0,
          friendOfFriendPhone: '$contactsByProfession.friends.phone',
        },
      },
    ]);

    // Combine your contacts, friends, and friends of friends
    const allContacts = [...yourContacts, ...friendsOfFriends];

    return allContacts;
  } catch (error) {
    console.error('Error finding contacts:', error);
    throw error;
  }
}

// Example usage
const targetPhoneNumber = '7982181060';
const targetProfession = 'ML Developer';
findContactsAndFriendsByPhoneNumberAndProfession(targetPhoneNumber, targetProfession)
  .then(result => {
    console.log('All contacts, friends, and friends of friends:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
