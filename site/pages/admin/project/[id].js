import Link from 'next/link';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/layout/admin/Page';
import TableTransactions from '../../../components/admin/TableTransactions';
import withAuth from '../../../components/layout/admin/HOC/withAuth';
import api from '../../../fetch';
import Edit from '../../../assets/icon/edit.svg';
import Eye from '../../../assets/icon/eye.svg';

const styles = {
  section: {
    border: '1px solid grey',
    margin: '10px',
    padding: '10px'
  }
};

const AdminViewProjectPage = () => {
  const [project, setProject] = useState({
    published: false,
    archived: false
  });
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  async function getProject() {
    const { query } = router;

    const { projects } = await api.get('admin_projects');
    const fetchedProject = projects.find((item) => String(item.id) === query.id);

    const { transactions: fetchedTransactions } = await api.get('transactions', { project_id: query.id }) || {};

    setProject({
      ...fetchedProject,
      published: fetchedProject.state === 'published',
      archived: fetchedProject.state === 'archived'
    });
    setTransactions(fetchedTransactions);
  }

  useEffect(() => {
    getProject();
  }, [router.query]);

  const publishProject = async (state) => {
    const projectData = {
      ...project,
      state,
      id: project.id
    };

    await api.post('update_project', projectData);
    await getProject();
  };

  // eslint-disable-next-line no-nested-ternary
  const borderType = project.archived
    ? 'danger'
    : project.completed
      ? 'success'
      : '';

  return (
    <Page>
      {project.image && <div className="project-image-wrapper" style={{ backgroundImage: `url(${project.image})` }} />}
      <div className="container-fluid" style={{ marginTop: '30px' }}>
        <Card border={borderType}>
          <Card.Header className="d-flex justify-content-between">
            <div>
              <h2 className="form-title">
                {project.name_uk}&nbsp;({project.name_en})
              </h2>
              <span className="text-danger">{project.archived ? '(видалено)' : ''}</span>
              <span className="text-green">{project.completed ? '(профінансовано)' : ''}</span>
              <div>
                <span className="mr-1">
                  {project.currency || 'UAH'}
                </span>
                <span className="text-green">{project.slug === 'shpp-kowo' ? project.this_month_funded : project.amount_funded}</span>
                <span className="text-muted">/{project.amount}</span>
                {project.slug === 'shpp-kowo' && <span className="text-muted">&nbsp;цього місяця</span>}
              </div>
            </div>
            <div>
              <Link href="/project/[id]" as={`/project/${project.id}`}>
                <Button variant="outline-secondary" size="sm">
                  <Eye /> Переглянути
                </Button>
              </Link>
              <Link href="/admin/project/edit/[id]" as={`/admin/project/edit/${project.id}`}>
                <Button variant="outline-secondary" size="sm">
                  <Edit /> Редагувати
                </Button>
              </Link>
            </div>
            <div>
              <Form.Switch
                checked={project.published}
                id="published"
                onChange={(e) => publishProject(e.target.checked ? 'published' : 'unpublished')}
                label="Опубліковано"
              />
              <Form.Switch
                checked={project.archived}
                id="archived"
                isInvalid
                onChange={(e) => publishProject(e.target.checked ? 'archived' : 'unpublished')}
                label="Видалено"
              />
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <section style={styles.section}>
                  <p><strong>Короткий опис uk:</strong></p>
                  <div>{project.short_description_uk}</div>
                </section>
              </Col>
              <Col>
                <section style={styles.section}>
                  <p><strong>Короткий опис en:</strong></p>
                  <div>{project.short_description_en}</div>
                </section>
              </Col>
            </Row>
            <Row>
              <Col>
                <section style={styles.section}>
                  <p><strong>Опис (uk):</strong></p>
                  <div dangerouslySetInnerHTML={{ __html: project.description_uk }} />
                </section>
              </Col>
              <Col>
                <section style={styles.section}>
                  <p><strong>Опис (en):</strong></p>
                  <div dangerouslySetInnerHTML={{ __html: project.description_en }} />
                </section>
              </Col>
            </Row>
            <section style={styles.section}>
              <p><strong>Транзакції:</strong></p>
              <div>
                {
                  transactions.length
                    ? <TableTransactions transactions={transactions} type="project" onListUpdated={getProject} />
                    : <p>Поки не було жодної транзакції</p>
                }
              </div>
            </section>
          </Card.Body>
          <Card.Footer>
            <div className="text-muted d-flex justify-content-between">
              <span>
                <span>Створено:&nbsp;</span>
                {new Date(project.created_at).toLocaleDateString('uk')}
              </span>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </Page>
  );
};

// export const runtime = 'experimental-edge';

export default withAuth(AdminViewProjectPage);
