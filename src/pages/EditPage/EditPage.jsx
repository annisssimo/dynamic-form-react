import { useLoaderData, useNavigate } from 'react-router';

import ContactForm from '../../components/ContactForm/ContactForm';
import { editContact } from '../../api/api';

const EditPage = () => {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  const handleEdit = async (data) => {
    if (Object.keys(data).length > 0) {
      try {
        await editContact(contact.id, data);
        navigate('/');
      } catch (error) {
        alert('Failed to update contact. Please try again.');
        console.error('Failed to update contact', error);
      }
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
