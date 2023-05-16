import Link from 'next/link';
import { Card, Container, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import Page from '../../components/layout/admin/Page';
import withAuth from '../../components/layout/admin/HOC/withAuth';
import api from '../../api';

class AdminListPage extends Component {
  state = {
    projects: []
  };

  async componentDidMount() {
    const { projects = [] } = (await api.get('admin_projects')) || {};
    this.setState({ projects });
  }

  render() {
    const { projects } = this.state;

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
                      <Link
                        key={project.id}
                        href="/admin/project/view/[id]"
                        as={`/admin/project/view/${project.id}`}
                      >
                        <tr style={{ cursor: 'pointer' }}>
                          <td>{index + 1}</td>
                          <td>{(project.name_uk || project.name || '').slice(0, 30)}</td>
                          <td>{project.amount}</td>
                          <td>{project.amount_funded}</td>
                          <td>{project.state}</td>
                          <td>{project.completed.toString()}</td>
                          <td>{new Date(project.created_at || 0).toLocaleDateString('uk')}</td>
                        </tr>
                      </Link>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </Page>
    );
  }
}

export default withAuth(AdminListPage);
