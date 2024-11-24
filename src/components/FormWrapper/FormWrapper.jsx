import styles from './FormWrapper.module.css';

const FormWrapper = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};

export default FormWrapper;
