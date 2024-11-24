import { useLoaderData, useNavigate } from 'react-router';

import ContactForm from '../../components/ContactForm/ContactForm';
import { editContact } from '../../api/api';
import { filterData } from '../../utils/filterData';
import { ERROR_MESSAGES } from '../../shared/constants/errorMessages';

const EditPage = () => {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  const handleEdit = async (data) => {
    const filteredData = filterData(data, contact);
    try {
      await editContact(contact.id, filteredData);
      navigate('/');
    } catch (error) {
      alert(ERROR_MESSAGES.UPDATE_FAILED);
      console.error('Failed to update contact', error);
    }
  };

  return (
    <>
      <h1>Edit Contact</h1>
      <ContactForm onSubmit={handleEdit} defaultValues={contact} />
    </>
  );
};

export default EditPage;
