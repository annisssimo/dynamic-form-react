import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';

import { validationSchema } from './validationSchema';
import FormWrapper from '../FormWrapper/FormWrapper';
import styles from './ContactForm.module.css';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import RadioGroup from '../RadioGroup/RadioGroup';
import ProjectList from '../ProjectList/ProjectList';

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

  const navigate = useNavigate();

  const category = watch('contactCategory');

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

  const handleFormSubmit = (data) => {
    onSubmit(data);
    navigate('/');
  };

  return (
    <FormWrapper onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        label="First Name*"
        error={errors.firstName}
        style={{ gridArea: 'firstName' }}
        {...register('firstName')}
        onChange={handleInputChange('firstName')}
      />

      <InputField
        label="Last Name"
        error={errors.lastName}
        style={{ gridArea: 'lastName' }}
        {...register('lastName')}
        onChange={handleInputChange('lastName')}
      />

      <InputField
        label="Phone*"
        error={errors.phone}
        style={{ gridArea: 'phone' }}
        {...register('phone')}
        onChange={handleInputChange('phone')}
      />

      <InputField
        label="Email*"
        error={errors.email}
        style={{ gridArea: 'email' }}
        {...register('email')}
        onChange={handleInputChange('email')}
      />

      <SelectField
        label="Preferred Contact Method"
        style={{ gridArea: 'method' }}
        options={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'message', label: 'Text Message' },
        ]}
        {...register('method')}
      />

      <SelectField
        label="Best Time to Contact"
        style={{ gridArea: 'time' }}
        options={[
          { value: 'morning', label: 'Morning' },
          { value: 'afternoon', label: 'Afternoon' },
          { value: 'evening', label: 'Evening' },
        ]}
        {...register('time')}
      />

      <RadioGroup
        label="Contact Category*"
        options={[
          { value: 'personal', label: 'Personal' },
          { value: 'business', label: 'Business' },
        ]}
        name="contactCategory"
        register={register}
        style={{ gridArea: 'type' }}
        error={errors.contactCategory}
      />

      {category === 'business' && (
        <>
          <InputField
            label="Company Name"
            style={{ gridArea: 'companyName' }}
            {...register('companyName')}
          />
          <SelectField
            label="Company Role"
            style={{ gridArea: 'companyRole' }}
            options={[
              { value: 'Other', label: 'Other' },
              { value: 'Manager', label: 'Manager' },
              { value: 'Employee', label: 'Employee' },
              { value: 'Consultant', label: 'Consultant' },
            ]}
            error={errors.companyRole}
            {...register('companyRole')}
          />
        </>
      )}

      <ProjectList
        projects={projectFields}
        errors={errors}
        register={register}
        removeProject={removeProject}
        addProject={addProject}
        canAddProject={canAddProject}
      />

      <button type="submit" className={styles.saveButton}>
        SAVE
      </button>
    </FormWrapper>
  );
};

export default ContactForm;
