import styles from './RadioGroup.module.css';

const RadioGroup = ({ label, options, value, onChange, name, style }) => {
  return (
    <div className={styles.contactCategory} style={style}>
      <label>{label}</label>
      <div className={styles.radioBtns}>
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
