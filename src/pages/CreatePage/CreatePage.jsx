import { useNavigate } from 'react-router';

import ContactForm from '../../components/ContactForm/ContactForm';
import { createContact } from '../../api/api';
import { filterData } from '../../utils/filterData';

const CreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const filteredData = filterData(data);
    if (Object.keys(filteredData).length > 0) {
      await createContact(filteredData);
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
