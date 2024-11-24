import { forwardRef } from 'react';

import styles from './InputField.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const InputField = forwardRef(
  ({ label, error, className = '', style = {}, ...rest }, ref) => (
    <div style={style} className={className}>
      {label && <label>{label}</label>}
      <input
        ref={ref}
        {...rest}
        className={error ? `${styles.errorInput}` : ''}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  )
);

InputField.displayName = 'InputField';

export default InputField;
