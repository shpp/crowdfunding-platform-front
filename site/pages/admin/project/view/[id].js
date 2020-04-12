import Link from 'next/link';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Page from '../../../../components/layout/admin/Page';
import ProjectTransactions from '../../../../components/admin/ProjectTransactions';
import withAuth from '../../../../components/layout/admin/HOC/withAuth';
import api from '../../../../api';
import Edit from '../../../../assets/icon/edit.svg';
import Eye from '../../../../assets/icon/eye.svg';

const styles = {
  section: {
    border: '1px solid grey',
    margin: '10px',
    padding: '10px'
  }
};

class AdminViewProjectPage extends Component {
  state = {
    project: {
      published: false
    },
    transactions: []
  };

  async componentDidMount() {
    await this.getProject();
  }

  async getProject() {
    const { query } = this.props.router;

    const { projects } = await api.get('admin_projects');
    const project = projects.find((item) => item._id === query.id);

    const { transactions } = await api.get('transactions', { project_id: query.id }) || {};

    this.setState({ project: {
      ...project,
      published: project.state === 'published',
      archived: project.state === 'archived'
    },
    transactions });
  }

  async publishProject(state) {
    const projectData = {
      ...this.state.project,
      state,
      id: this.state.project._id
    };

    await api.post('update_project', projectData);
    await this.getProject();
  }

  render() {
    const { project, transactions } = this.state;

    const creationDate = () => {
      const event = new Date(+project.createdAtTS);
      return `${event.getDate()}.${event.getMonth()}.${event.getFullYear()}`;
    };
    // eslint-disable-next-line no-nested-ternary
    const borderType = this.state.project.archived
      ? 'danger'
      : this.state.project.completed
        ? 'success'
        : '';

    return (
      <Page>
        <div className="project-image-wrapper" />
        <Container className="container-fluid">
          <Card border={borderType}>
            <Card.Header className="d-flex justify-content-between">
              <div>
                <h2 className="form-title">
                  {project.name}&nbsp;
                </h2>
                <span className="text-danger">{this.state.project.archived ? '(видалено)' : ''}</span>
                <span className="text-green">{this.state.project.completed ? '(профінансовано)' : ''}</span>
                <div>
                  <span className="mr-1">
                    {project.currency}
                  </span>
                  <span className="text-green">{project.amountFunded}</span>
                  <span className="text-muted">/{project.amount}</span>
                </div>
              </div>
              <div>
                <Link href="/project/[id]" as={`/project/${project._id}`}>
                  <Button variant="outline-secondary" size="sm">
                    <Eye /> Preview
                  </Button>
                </Link>
                <Link href="/admin/project/edit/[id]" as={`/admin/project/edit/${project._id}`}>
                  <Button variant="outline-secondary" size="sm">
                    <Edit /> Edit
                  </Button>
                </Link>
              </div>
              <div>
                <Form.Switch
                  checked={this.state.project.published}
                  id="published"
                  onChange={(e) => this.publishProject(e.target.checked ? 'published' : 'unpublished')}
                  label="Опубліковано"
                />
                <Form.Switch
                  checked={this.state.project.archived}
                  id="archived"
                  isInvalid
                  onChange={(e) => this.publishProject(e.target.checked ? 'archived' : 'unpublished')}
                  label="Видалено"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <section style={styles.section}>
                    <p><strong>Короткий опис:</strong></p>
                    <div>{project.shortDescription}</div>
                  </section>
                </Col>
              </Row>
              <Row>
                <Col>
                  <section style={styles.section}>
                    <p><strong>Опис:</strong></p>
                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                  </section>
                </Col>
                <Col>
                  <section style={styles.section}>
                    <p><strong>Заплановані витрати:</strong></p>
                    <div dangerouslySetInnerHTML={{ __html: project.plannedSpendings }} />
                  </section>
                </Col>
              </Row>
              <Row>
                <Col>
                  <section style={styles.section}>
                    <p><strong>Транзакції:</strong></p>
                    <ProjectTransactions
                      transactions={transactions}
                      project_id={project._id}
                    />
                  </section>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Row className="text-muted d-flex justify-content-between">
                <span>
                  <span>Створено:</span>
                  {creationDate()}
                </span>
              </Row>
            </Card.Footer>
          </Card>
        </Container>
        <style jsx>
          {`
          .project-image-wrapper {
            width: 100vw;
            margin: -51px;
            height: 400px;
            overflow: hidden;
            margin-bottom: 0;
            background-size: cover;
            background-position: center center;
            background-image: url(${project.image});
          }    
          .form-title {
             margin-bottom: 0px;
          }
          h2 {
            display: inline-block;
          }
         `}
        </style>
      </Page>
    );
  }
}

export default withAuth(withRouter(AdminViewProjectPage));
