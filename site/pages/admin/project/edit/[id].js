import {
  Form, Row, Col, Container, Button,
} from 'react-bootstrap';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import InputBlock from '../../../../components/admin/InputBlock';
import Page from '../../../../components/layout/admin/Page';
import withAuth from '../../../../components/layout/admin/HOC/withAuth';
import api from '../../../../api';

const style = {
  backgroundColor: 'white',
  padding: '20px',
};

const defaultProjectValue = {
  name: '',
  content_id: '',
  published: false,
  archived: false,
  created_at: '',
  amount: 0,
  currency: 'UAH',
  _ready: false,
};

function formatDate(createdAt) {
  return new Date((createdAt) || Date.now())
    .toISOString()
    .split('T')[0];
}

class AdminProjectEdit extends Component {
  state = {
    project: {
      ...defaultProjectValue
    }
  };

  async componentDidMount() {
    await this.getProject();
  }

  async getProject() {
    const { query } = this.props.router;

    const { project } = await api.request(`projects/${query.id}`, 'get');
    this.setState({
      project: {
        ...project,
        published: project.state === 'published',
        archived: project.state === 'archived',
        created_at: formatDate(project.created_at),
        _ready: true
      }
    });
  }

  handleChange(input) {
    const { project } = this.state;
    const newv = input.name !== 'created_at' ? input.value : formatDate(input.value);
    this.setState({
      project: {
        ...defaultProjectValue,
        ...project,
        [input.name]: newv
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { project } = this.state;
    const projectData = {
      ...defaultProjectValue,
      ...project,
      id: project.id,
      currency: project.currency,
      amount: +project.amount,
      created_at: project.created_at,
      // eslint-disable-next-line no-nested-ternary
      state: project.archived
        ? 'archived'
        : project.published
          ? 'published'
          : 'unpublished',
    };

    await api.post('update_project', projectData);
    await this.getProject();
  }


  render() {
    const { project } = this.state;

    // eslint-disable-next-line no-underscore-dangle
    if (!project._ready) {
      return null;
    }

    const shortInputLabels = [
      { name: 'amount', label: 'Сума, яку необхідно зібрати', type: 'number' },
      { name: 'created_at', label: 'Дата створення', type: 'date' },
    ];

    const longInputLabels = [
      { name: 'name', label: "Ім'я проекту", type: 'text' },
      { name: 'content_id', label: 'ID сторінки в ноушені', type: 'text' },
    ];

    return (
      <Page>
        <Container className="mt-4 con edit-project" style={style}>
          <h1 className="form-header text-center">
            Редагувати дані проекту
          </h1>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col style={{ maxWidth: '50%' }}>
                {shortInputLabels.map((label) => (
                  <InputBlock
                    key={label.name}
                    label={label}
                    value={project}
                    handleChange={(e) => this.handleChange(e.target)}
                  />
                ))}
              </Col>
            </Row>
            <Row>
              <Col>
                {longInputLabels.map((label) => (
                  <InputBlock
                    key={label.name}
                    label={label}
                    value={project}
                    handleChange={(e) => this.handleChange(e.target)}
                  />
                ))}
              </Col>
            </Row>
            <Row>
              <Col>
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
