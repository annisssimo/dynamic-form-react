import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import styles from './ContactsListTable.module.css';
import { deleteContact } from '../../api/api';

const ContactsListTable = ({ data, onDelete, onEdit }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        onDelete(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      onEdit(id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Preferred Contact Method</th>
          <th>Contact Category</th>
          <th>Projects</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="8" className={styles.noData}>
              No contacts available
            </td>
          </tr>
        ) : (
          data.map((contact, index) => (
            <tr key={contact.id || index}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td>{contact.method}</td>
              <td>
                {contact.contactCategory === 'business'
                  ? `${contact.contactCategory} (${contact.companyRole} at ${contact.companyName})`
                  : `${contact.contactCategory}`}
              </td>
              <td>
                {contact.projects?.map((proj, index) => {
                  return (
                    <span key={index}>
                      <b>{`${index + 1}) ${proj.name}`}</b>
                      <br />
                      <em>{proj.deadline}</em>
                      <br />
                    </span>
                  );
                })}
              </td>
              <td>
                <button
                  className={`${styles.editBtn} ${styles.actionBtn}`}
                  onClick={() => handleEdit(contact.id)}
                >
                  <MdEdit />
                </button>
              </td>
              <td>
                <button
                  className={`${styles.deleteBtn} ${styles.actionBtn}`}
                  onClick={() => handleDelete(contact.id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ContactsListTable;
