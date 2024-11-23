import axios from 'axios';

const API_BASE_URL = 'http://localhost:3441/api';

export const getAllContacts = async () => {
  try {
    const contactsList = await axios.get(`${API_BASE_URL}/contacts`);
    return contactsList.data;
  } catch (err) {
    console.error(err);
  }
};

export const createContact = async (data) => {
  console.log(data);
  try {
    await axios.post(`${API_BASE_URL}/contacts`, data);
  } catch (err) {
    console.error(err);
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/contacts/${id}`);
    console.log(id);
    return response.data;
  } catch (error) {
    console.error('Failed to delete contact:', error);
    throw error;
  }
};
