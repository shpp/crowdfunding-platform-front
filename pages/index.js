import { useRouter } from 'next/router';
import Page from '../layout/Page';
import ProjectCard from '../components/ProjectCard';
import projectsMock from '../mock/projects';

const styles = {
  container: {
    maxWidth: '85%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '30px 0 0 0',
  },
};

function HomePage() {
  const getSortedProjects = (projects) => {
    const router = useRouter();
    const { filter } = router.query;
    const completedProjects = projects.filter((project) => project.completed);
    const notCompletedProjects = projects.filter((project) => !project.completed);


    return filter === 'completed'
      ? [...(completedProjects.sort((a, b) => (a.creationTime < b.creationTime ? 1 : -1)))]
      : [
        ...(notCompletedProjects.sort((a, b) => (a.creationTime < b.creationTime ? 1 : -1))),
        ...(completedProjects.sort((a, b) => (a.creationTime < b.creationTime ? 1 : -1))),
      ];
  };

  return (
    <Page>
      <div style={styles.container} className="homepage">
        {getSortedProjects(projectsMock).map((project) => (
          <ProjectCard
            project={project}
            key={project.id}
          />
        ))}
      </div>
      <style jsx>
        {
        `@media screen and (max-width: 1240px){
            .homepage {
              max-width: initial !important;
              width: 100% !important;
              padding: 30px 30px 0 !important;
            }
          }
          
          @media screen and (max-width: 768px){
            .homepage {
              padding: 20px 20px 0!important;
              justify-content: center;
            }
          }
      `
}
      </style>
    </Page>
  );
}


export default HomePage;
