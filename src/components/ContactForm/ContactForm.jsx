import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormWrapper from '../FormWrapper/FormWrapper';
import styles from './ContactForm.module.css';

const phoneRegExp =
  /^(\+?[1-9]{1,4}[ -]?)?(\(?\d{1,4}\)?[ -]?)?(\d{1,4}[ -]?)?\d{1,4}[ -]?\d{1,4}$/;

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .max(50, 'Max length is 50 characters'),
  lastName: yup
    .string()
    .required('Last Name is required')
    .max(50, 'Max length is 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: yup.string().matches(phoneRegExp, "Phone number isn't valid"),
  projects: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Project Name is required'),
      tasks: yup.array().of(
        yup.object().shape({
          name: yup.string().required('Task Name is required'),
          status: yup.string().required('Task Status is required'),
        })
      ),
    })
  ),
});

const ContactForm = ({ onSubmit, defaultValues = {} }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    fields: projectFields,
    append: addProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: 'projects',
  });

  const [category, setCategory] = useState(
    defaultValues.contactCategory || 'Personal'
  );

  const projectNames = watch('projects', []).map((project) => project.name);

  const canAddProject = projectNames.every(
    (name) => name && name.trim() !== ''
  );

  const handleInputChange = (fieldName) => {
    return (e) => {
      setValue(fieldName, e.target.value);
      clearErrors(fieldName);
    };
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div style={{ gridArea: 'firstName' }}>
        <label>First Name</label>
        <input
          {...register('firstName')}
          onChange={handleInputChange('firstName')}
          className={errors.firstName ? styles.errorInput : ''}
        />
        {errors.firstName && (
          <span className={styles.error}>{errors.firstName.message}</span>
        )}
      </div>

      <div style={{ gridArea: 'lastName' }}>
        <label>Last Name</label>
        <input
          {...register('lastName')}
          onChange={handleInputChange('lastName')}
          className={errors.lastName ? styles.errorInput : ''}
        />
        {errors.lastName && (
          <span className={styles.error}>{errors.lastName.message}</span>
        )}
      </div>

      <div style={{ gridArea: 'phone' }}>
        <label>Phone</label>
        <input
          {...register('phone')}
          onChange={handleInputChange('phone')}
          className={errors.phone ? styles.errorInput : ''}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </div>

      <div style={{ gridArea: 'email' }}>
        <label>Email</label>
        <input
          {...register('email')}
          onChange={handleInputChange('email')}
          className={errors.email ? styles.errorInput : ''}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div style={{ gridArea: 'method' }}>
        <label>Preferred Contact Method</label>
        <select {...register('method')}>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="message">Text Message</option>
        </select>
      </div>

      <div style={{ gridArea: 'time' }}>
        <label>Best Time to Contact</label>
        <select {...register('time')}>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      <div className={styles.contactCategory} style={{ gridArea: 'type' }}>
        <label>Contact Category</label>
        <div className={styles.radioBtns}>
          <input
            type="radio"
            id="personal"
            value="personal"
            checked={category === 'personal'}
            onChange={() => setCategory('personal')}
          />
          <label htmlFor="personal">Personal</label>

          <input
            type="radio"
            id="business"
            value="business"
            checked={category === 'business'}
            onChange={() => setCategory('business')}
          />
          <label htmlFor="business">Business</label>
        </div>
      </div>

      {category === 'business' && (
        <>
          <div style={{ gridArea: 'companyName' }}>
            <label>Company Name</label>
            <input {...register('companyName')} />
          </div>
          <div style={{ gridArea: 'companyRole' }}>
            <label>Company Role</label>
            <select {...register('companyRole')}>
              <option value="">Select</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
              <option value="Consultant">Consultant</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </>
      )}

      <div style={{ gridArea: 'projects' }} className={styles.projects}>
        <h3>Projects</h3>
        {projectFields.map((project, index) => (
          <div key={project.id} className={styles.projectSection}>
            <label>Project Name</label>
            <input {...register(`projects.${index}.name`)} />
            {errors.projects?.[index]?.name && (
              <span className={styles.error}>
                {errors.projects[index]?.name?.message}
              </span>
            )}

            <label>Project Deadline</label>
            <input type="date" {...register(`projects.${index}.deadline`)} />

            <button
              type="button"
              onClick={() => removeProject(index)}
              className={styles.removeProjectButton}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addProject({ name: '', tasks: [] })}
          className={styles.addProjectButton}
          disabled={!canAddProject}
        >
          + project
        </button>
      </div>

      <button type="submit" className={styles.saveButton}>
        SAVE
      </button>
    </FormWrapper>
  );
};

export default ContactForm;
