import Link from 'next/link';
import { Button, Card, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Page from '../../../../components/layout/admin/Page';
import ProjectTransactions from '../../../../components/admin/ProjectTransactions';
import withAuth from '../../../../components/layout/admin/HOC/withAuth';
import api from '../../../../api';
import Edit from '../../../../assets/icon/edit.svg';
import Eye from '../../../../assets/icon/eye.svg';
import { i18n } from '../../../../utils/translations';

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
      published: false,
      archived: false
    },
    transactions: []
  };

  async componentDidMount() {
    await this.getProject();
  }

  async getProject() {
    const { query } = this.props.router;

    const { projects } = await api.get('admin_projects');
    const project = projects.find((item) => item.id == query.id);

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
      id: this.state.project.id
    };

    await api.post('update_project', projectData);
    await this.getProject();
  }

  render() {
    const { project, transactions } = this.state;

    // eslint-disable-next-line no-nested-ternary
    const borderType = this.state.project.archived
      ? 'danger'
      : this.state.project.completed
        ? 'success'
        : '';

    return (
      <Page>
        {project.image && <div className="project-image-wrapper" />}
        <div className="container-fluid" style={{ marginTop: '30px' }}>
          <Card border={borderType}>
            <Card.Header className="d-flex justify-content-between">
              <div>
                <h2 className="form-title">
                  {project[`name_${i18n.language}`]}&nbsp;
                </h2>
                <span className="text-danger">{this.state.project.archived ? '(видалено)' : ''}</span>
                <span className="text-green">{this.state.project.completed ? '(профінансовано)' : ''}</span>
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
                <Link href="/project/[id]" as={`/project/${project._id}`}>
                  <Button variant="outline-secondary" size="sm">
                    <Eye /> Preview
                  </Button>
                </Link>
                <Link href="/admin/project/edit/[id]" as={`/admin/project/edit/${project.id}`}>
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
              <section style={styles.section}>
                <p><strong>Короткий опис ({i18n.language}):</strong></p>
                <div>{project[`short_description_${i18n.language}`]}</div>
              </section>
              <section style={styles.section}>
                <p><strong>Опис ({i18n.language}):</strong></p>
                <div dangerouslySetInnerHTML={{ __html: project[`description_${i18n.language}`] }} />
              </section>
              <section style={styles.section}>
                <p><strong>Транзакції:</strong></p>
                <ProjectTransactions
                  transactions={transactions}
                  project_id={project.id}
                />
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
