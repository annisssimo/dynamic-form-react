import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './ListPage.module.css';
import ContactsListTable from '../../components/ContactsListTable/ContactsListTable';
import { getAllContacts } from '../../api/api';

const ListPage = () => {
  const [contactsList, setContactsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await getAllContacts();
      setContactsList(contacts);
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = (id) => {
    setContactsList((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const handleEditContact = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCreateClick = () => {
    navigate('/create');
  };

  return (
    <div className={styles.container}>
      <h1>Contact List</h1>

      <ContactsListTable
        data={contactsList}
        onDelete={handleDeleteContact}
        onEdit={handleEditContact}
      />

      <button className={styles.createButton} onClick={handleCreateClick}>
        Create New Contact
      </button>
    </div>
  );
};

export default ListPage;
