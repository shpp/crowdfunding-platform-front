import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Page from '../../layout/admin/Page';


const styles = {
  container: {
    maxWidth: '85%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '30px 0 0 0',
  },
};

const AdminListPage = (props) => {
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

  const { projects } = props;

  return (
    <Page>
      <div style={styles.container} className="homepage">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Назва</th>
              <th>Планові витрати</th>
              <th>Сума</th>
              <th>Зібрано</th>
              <th>Опубліковано</th>
              <th>Завершено</th>
            </tr>
          </thead>
          <tbody>
            {getSortedProjects(projects).map((project, index) => (
              <Link href='/admin/project/view/[id]' as={`/admin/project/view/${project._id}`}>
                <tr className="project-table-row">
                  <td>{index + 1}</td>
                  <td>{project.name}</td>
                  <td>{project.plannedSpendings}</td>
                  <td>{project.amount}</td>
                  <td>{project.amountFunded}</td>
                  <td>{project.published.toString()}</td>
                  <td>{project.completed.toString()}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </Table>
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
            
            .project-table-row {
              cursor: pointer;
            }
          `
        }
      </style>
    </Page>
  );
};

AdminListPage.getInitialProps = async function getInitialProps() {
  const prefix = process.browser ? 'https://cors-anywhere.herokuapp.com/' : ''; // TODO: Remove when CORS will be fixed

  const res = await fetch(`${prefix}https://back.donate.2.shpp.me/api/v1/projects/list`);
  const data = await res.json();


  return {
    projects: data.projects,
  };
};

export default AdminListPage;
