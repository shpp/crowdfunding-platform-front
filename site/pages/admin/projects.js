import { useRouter } from 'next/router';
import { Card, Container, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Page from '../../components/layout/admin/Page';
import withAuth from '../../components/layout/admin/HOC/withAuth';
import api from '../../fetch';

const AdminListPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      setProjects((await api.get('admin_projects')).projects);
    };

    getProjects();
  }, []);

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
                  <th>Назва українською</th>
                  <th>Сума</th>
                  <th>Зібрано</th>
                  <th>Стан</th>
                  <th>Завершено</th>
                  <th>Дата створення</th>
                </tr>
              </thead>
              <tbody>
                {projects
                  .filter(({ state }) => state !== 'archived')
                  .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
                  .map((project, index) => (
                    <tr
                      key={index}
                      style={{ cursor: 'pointer' }}
                      onClick={() => router.push(`/admin/project/${project.id}`)}
                    >
                      <td>{index + 1}</td>
                      <td>{(project.name_uk || project.name || '').slice(0, 30)}</td>
                      <td>{project.amount}</td>
                      <td>{project.amount_funded}</td>
                      <td>{project.state}</td>
                      <td>{project.completed.toString()}</td>
                      <td>{new Date(project.created_at || 0).toLocaleDateString('uk')}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Page>
  );
};

export const runtime = 'edge';

export default withAuth(AdminListPage);
