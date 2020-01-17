import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Container, Table } from 'react-bootstrap';
import Page from '../../layout/admin/Page';
import withAuth from '../../layout/admin/HOC/withAuth';
import { PROJECTS_LIST } from '../../utils/api_urls';
import { fetchDataGet } from '../../utils/fetchData';


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
      <h1 className="text-center">Проекти</h1>
      <Container>
        <Card>
          <Card.Header className="justify-content-around d-flex" />
          <Card.Body>
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
                  <Link
                    key={project._id}
                    href="/admin/project/view/[id]"
                    as={`/admin/project/view/${project._id}`}
                  >
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
          </Card.Body>
        </Card>
      </Container>
      <style jsx>
        {
          `
          .project-table-row {
              cursor: pointer;
            }
          `
        }
      </style>
    </Page>
  );
};

AdminListPage.getInitialProps = async () => {
  const res = await fetchDataGet(`${PROJECTS_LIST}`);

  return {
    projects: res.projects,
  };
};

export default withAuth(AdminListPage);
