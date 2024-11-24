import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ error }) => {
  return <span className={styles.error}>{error.message}</span>;
};

export default ErrorMessage;
