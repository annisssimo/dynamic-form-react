import ContactForm from '../../components/ContactForm/ContactForm';
import { editContact } from '../../api/api';
import { useLoaderData } from 'react-router';

const EditPage = () => {
  const { contact } = useLoaderData();

  return (
    <>
      <h1>Edit Contact</h1>
      <ContactForm
        onSubmit={(id, data) => editContact(id, data)}
        defaultValues={contact}
      />
    </>
  );
};

export default EditPage;
