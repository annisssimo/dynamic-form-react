import axios from 'axios';

export const createContact = async (data) => {
  console.log(data);
  try {
    await axios.post('http://localhost:3441/api/contacts', data);
  } catch (err) {
    console.error(err);
  }
};

export const getAllContacts = async () => {
  try {
    const contactsList = await axios.get('http://localhost:3441/api/contacts');
    return contactsList.data;
  } catch (err) {
    console.error(err);
  }
};
