import ProgressBar from "./ProgressBar";

const styles = {
  wrapper: {
    padding: '10px',
    margin: '0 15px 50px',
    width: 'calc(100%/3 - 30px)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    transition: '0.3s'
  },
  publishedAt: {
    textAlign: 'right',
    opacity: '0.6'
  },
  image: {
    height: '150px',
    objectFit: 'cover',
    margin: '10px 0'
  },
  projectTitle: {
    margin: '5px 0'
  },
  description: {
    margin: '10px 0 15px',
    flexGrow: 1
  },
  fundedText: {
    marginBottom: '5px',
    display: 'inline-block'
  },
  buttonWrapper: {
    padding: '25px 0 15px',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '10px 25px',
    fontSize: '20px',
    display: 'inline-block',
    cursor: 'pointer'
  }
};

const ProjectCard = ({ project }) => {
  return (
    <div style={styles.wrapper} className="card">
      <style jsx>{`
        .card {
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
        }
        .card:hover h3{
          color: #27ae60;
        }
      `}</style>
      <div style={styles.publishedAt}>
        {`опубліковано ${new Date(project.creationTime).toLocaleDateString("ua-UA")}`}
      </div>
      <img src={project.image} alt="placeholder" style={styles.image}/>
      <h3 style={styles.projectTitle}>
        {project.name}
      </h3>
      <p style={styles.description}>
        {project.description}
      </p>
      <div>
        <span style={styles.fundedText}>{`Вже зібрали: ${project.amountFunded} грн (з ${project.amount} грн)`}</span>
        <ProgressBar
          amount={project.amount}
          funded={project.amountFunded}
        />
      </div>
      <div style={styles.buttonWrapper}>
        <button style={styles.button}>
          Підтримати
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
