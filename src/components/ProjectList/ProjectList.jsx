import styles from './ProjectList.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ProjectList = ({
  projects,
  errors,
  register,
  removeProject,
  addProject,
  canAddProject,
}) => {
  return (
    <div style={{ gridArea: 'projects' }} className={styles.projects}>
      <h3>Projects</h3>
      {projects.map((project, index) => (
        <div key={project.id} className={styles.projectSection}>
          <label>Project Name</label>
          <input {...register(`projects.${index}.name`)} />
          {errors.projects?.[index]?.name && (
            <ErrorMessage error={errors.projects[index].name} />
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
  );
};

export default ProjectList;
