import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import styles from './ContactsListTable.module.css';

const ContactsListTable = ({ data }) => {
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
                <button className={`${styles.editBtn} ${styles.actionBtn}`}>
                  <MdEdit />
                </button>
              </td>
              <td>
                <button className={`${styles.deleteBtn} ${styles.actionBtn}`}>
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
