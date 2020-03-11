import {
  Form, Row, Col, Container, Button, Tabs, Tab,
} from 'react-bootstrap';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import InputBlock from '../../../../components/InputBlock';
import Page from '../../../../layout/admin/Page';
import Editor from '../../../../components/Editor';
import withAuth from '../../../../layout/admin/HOC/withAuth';
import api from '../../../../api';

const style = {
  backgroundColor: 'white',
  padding: '20px',
};

class AdminProjectEdit extends Component {
  state = {
    project: {
      plannedSpendings: '',
      description: '',
      actualSpendings: '',
      published: false,
      archived: false,
      creationDate: ''
    }
  };

  async componentDidMount() {
    await this.getProject();
  }

  async getProject() {
    const { query } = this.props.router;

    const { projects } = await api.get('admin_projects');
    const project = projects.find((item) => item._id === query.id);
    this.setState({
      project: {
        ...project,
        published: project.state === 'published',
        archived: project.state === 'archived',
        creationDate: new Date((+project.createdAtTS + 2 * 60 * 60 * 1000) || Date.now())
          .toISOString()
          .split('T')[0]
      }
    });
  }

  handleChange(change) {
    const { project } = this.state;

    if (change.name === 'createdAtTS') {
      try {
        // eslint-disable-next-line no-param-reassign
        change.value = +new Date(change.value);
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }
    this.setState({
      project: {
        ...project,
        [change.name]: change.value
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const projectData = {
      ...this.state.project,
      image: this.state.project.image || '',
      createdAtTS: +new Date(this.state.project.creationDate),
      // eslint-disable-next-line no-nested-ternary
      state: this.state.project.archived
        ? 'archived'
        : this.state.project.published
          ? 'published'
          : 'unpublished',
    };

    await api.post('update_project', projectData);
    await this.getProject();
  }


  render() {
    const { project } = this.state;

    const labels = [
      { name: 'name', label: "Ім'я проекту", type: 'text', value: [project.name] },
      { name: 'creationDate', label: 'Дата створення', type: 'text', value: [project.creationDate] },
      { name: 'amount', label: 'Сума, яку необхідно зібрати', type: 'number', value: [project.amount] },
      { name: 'image', label: 'Картинка-обкладинка (URL)', type: 'text', value: [project.image], description: 'Краще за все видно картинки зі співвідношенням 16:9' },
      { name: 'shortDescription', label: 'Короткий опис', type: 'text', value: [project.shortDescription], description: '1-2 речення, які коротко описують весь проект' },
    ];

    return (
      <Page>
        <Container className="mt-4 con" style={style}>
          <h1 className="form-header text-center">
            Редагувати дані проекту
          </h1>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row className="flex-column flex-md-row">
              <Col>
                <InputBlock
                  inputLabels={labels}
                  handleChange={(e) => this.handleChange(e.target)}
                />
                <Form.Group>
                  <Form.Switch
                    checked={project.published}
                    id="published"
                    onChange={(e) => this.handleChange({
                      name: 'published',
                      value: e.target.checked
                    })}
                    label="Опубліковано"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Switch
                    checked={project.archived}
                    id="archived"
                    isInvalid
                    onChange={(e) => this.handleChange({
                      name: 'archived',
                      value: e.target.checked
                    })}
                    label="Видалено"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Tabs defaultActiveKey="description">
                  <Tab eventKey="description" title="Опис проекту">
                    <Editor
                      content={project.description}
                      onChange={(value) => this.handleChange({
                        value,
                        name: 'description'
                      })}
                    />
                  </Tab>
                  <Tab eventKey="purpose" title="Запланований кошторис">
                    <Editor
                      content={project.plannedSpendings}
                      onChange={(value) => this.handleChange({
                        value,
                        name: 'plannedSpendings'
                      })}
                    />
                  </Tab>
                  <Tab eventKey="actualSpending" title="Куди по факту витрачено кошти">
                    <Editor
                      content={project.actualSpendings}
                      onChange={(value) => this.handleChange({
                        value,
                        name: 'actualSpendings'
                      })}
                    />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
            <Row className="justify-content-center mt-5 mt-md-3">
              <Button
                variant="primary"
                type="submit"
              >
                Зберегти зміни
              </Button>
            </Row>
          </Form>
        </Container>
      </Page>
    );
  }
}

export default withAuth(withRouter(AdminProjectEdit));
