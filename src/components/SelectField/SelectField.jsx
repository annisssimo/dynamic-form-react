import { forwardRef } from 'react';

import styles from './SelectField.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SelectField = forwardRef(
  (
    { label, options = [], error, className = '', style = {}, ...rest },
    ref
  ) => (
    <div style={style} className={className}>
      {label && <label>{label}</label>}
      <select
        ref={ref}
        {...rest}
        className={error ? `${styles.errorInput}` : ''}
      >
        {options.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <ErrorMessage error={error} />}
    </div>
  )
);

SelectField.displayName = 'SelectField';

export default SelectField;
