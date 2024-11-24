import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
    await axios.delete(`${API_BASE_URL}/contacts/${id}`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const editContact = async (id, data) => {
  console.log(data);
  try {
    const response = await axios.put(`${API_BASE_URL}/contacts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getContactById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
