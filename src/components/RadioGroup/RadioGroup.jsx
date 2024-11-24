import styles from './RadioGroup.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const RadioGroup = ({ label, options, register, name, style, error }) => {
  return (
    <div className={styles.contactCategory} style={style}>
      <label>{label}</label>
      {error && <ErrorMessage error={error} />}
      <div className={styles.radioBtns}>
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              value={option.value}
              {...register(name)}
            />
            <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
