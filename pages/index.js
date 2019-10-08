import Page from '../layout/Page';
import ProjectCard from "../components/ProjectCard";
import projects from "../mock/projects";

const styles = {
  container: {
    maxWidth: '85%',
    display: 'flex',
    margin: '0 auto',
    padding: '30px 0 0 0'
  }
};

function HomePage() {
  return (
    <Page>
      <div style={styles.container}>
        {projects.map(project => (
          <ProjectCard
            project={project}
            key={project.id}
          />
        ))}
      </div>
    </Page>
  );
}


export default HomePage;
