import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../api';
import Page from '../../../components/layout/admin/Page';
import InputBlock from '../../../components/admin/InputBlock';

const style = {
  backgroundColor: 'white',
  padding: '20px',
};

const defaultProjectValue = {
  name: '',
  content_id: '',
  published: false,
  amount: 0,
  currency: 'UAH',
};

class AddProject extends Component {
  state = {
    project: {
      ...defaultProjectValue
    }
  };

  handleChange(input) {
    const { project } = this.state;
    const newv = input.value;
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
      amount: +project.amount,
      // eslint-disable-next-line no-nested-ternary
      state: project.published ? 'published' : 'unpublished',
    };

    const { projectId } = await api.post('create_project', projectData);
    await this.props.router.push('/admin/project/edit/[id]', `/admin/project/edit/${projectId}`);
  }

  render() {
    const { project } = this.state;

    const shortInputLabels = [
      { name: 'amount', label: 'Сума, яку необхідно зібрати', type: 'number' },
    ];

    const longInputLabels = [
      { name: 'name', label: 'Назва проекту', type: 'text' },
      { name: 'content_id', label: 'ID сторінки в ноушені', type: 'text' },
    ];

    return (
      <Page>
        <Container className="mt-4 con edit-project" style={style}>
          <h1 className="form-header text-center">
            Створити проект
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
              </Col>
            </Row>
            <Row className="justify-content-center mt-5 mt-md-3">
              <Button
                variant="primary"
                type="submit"
              >
                Зберегти
              </Button>
            </Row>
          </Form>
        </Container>
      </Page>
    );
  }
}

export default withRouter(AddProject);
