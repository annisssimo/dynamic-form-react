import { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router';

import styles from './ListPage.module.css';
import ContactsListTable from '../../components/ContactsListTable/ContactsListTable';

const ListPage = () => {
  const { contacts } = useLoaderData() || {};
  const [contactsList, setContactsList] = useState(contacts || []);
  const navigate = useNavigate();

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
