import axios from 'axios';
import ContactForm from '../../components/ContactForm/ContactForm';

const EditPage = () => {
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post('http://localhost:3441/api/contacts', data);
    } catch (err) {
      console.error(err);
    }
  };
  return <ContactForm onSubmit={onSubmit} />;
};

export default EditPage;
