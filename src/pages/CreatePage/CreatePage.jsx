import { useNavigate } from 'react-router';

import ContactForm from '../../components/ContactForm/ContactForm';
import { createContact } from '../../api/api';
import { filterData } from '../../utils/filterData';
import { ERROR_MESSAGES } from '../../shared/constants/errorMessages';

const CreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const filteredData = filterData(data);
      if (Object.keys(filteredData).length > 0) {
        await createContact(filteredData);
        navigate('/');
      }
    } catch (error) {
      alert(`${ERROR_MESSAGES.CREATE_FAILED} ${error.message}`);
      console.error(error);
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
