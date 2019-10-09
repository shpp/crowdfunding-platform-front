import Radium, {StyleRoot} from 'radium';
import Page from '../layout/Page';
import ProjectCard from "../components/ProjectCard";
import projects from "../mock/projects";
import breakpoints from "../theme/breakpoints";

const styles = {
  container: {
    maxWidth: '85%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '30px 0 0 0',
    [breakpoints.breakpointLarge]: {
      maxWidth: 'initial',
      width: '100%',
      padding: '30px 30px 0'
    },
    [breakpoints.breakpointMedium]: {
      padding: '20px 20px 0'
    }
  }
};

function HomePage() {
  const getSortedProjects = (projects) => {
    const completedProjects = projects.filter(project => project.completed);
    const notCompletedProjects = projects.filter(project => !project.completed);

    return [
      ...(notCompletedProjects.sort((a, b) => a.creationTime < b.creationTime ? 1 : -1)),
      ...(completedProjects.sort((a, b) => a.creationTime < b.creationTime ? 1 : -1))
    ];
  };

  return (
    <StyleRoot>
      <Page>
        <div style={styles.container}>
          {getSortedProjects(projects).map(project => (
            <ProjectCard
              project={project}
              key={project.id}
            />
          ))}
        </div>
      </Page>
    </StyleRoot>
  );
}


export default Radium(HomePage);
