import ContactForm from '../../components/ContactForm/ContactForm';
import { createContact } from '../../api/api';

const CreatePage = () => {
  return (
    <>
      <h1>Add a new contact</h1>
      <ContactForm onSubmit={createContact} />
    </>
  );
};

export default CreatePage;
