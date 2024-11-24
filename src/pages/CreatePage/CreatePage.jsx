import { useNavigate } from 'react-router';

import ContactForm from '../../components/ContactForm/ContactForm';
import { createContact } from '../../api/api';

const CreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    if (Object.keys(data).length > 0) {
      await createContact(data);
      navigate('/');
    }
  };

  return (
    <>
      <h1>Add a new contact</h1>
      <ContactForm onSubmit={handleCreate} />
    </>
  );
};

export default CreatePage;
