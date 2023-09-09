import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../fetch';
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

function AddProject() {
  const [project, setProject] = useState(defaultProjectValue);
  const router = useRouter();

  const handleChange = (input) => {
    const newv = input.value;
    setProject((prevProject) => ({
      ...defaultProjectValue,
      ...prevProject,
      [input.name]: newv,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectData = {
      ...defaultProjectValue,
      ...project,
      amount: +project.amount,
      state: project.published ? 'published' : 'unpublished',
    };

    const { projectId } = await api.post('create_project', projectData);
    await router.push('/admin/project/edit/[id]', `/admin/project/edit/${projectId}`);
  };

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
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col style={{ maxWidth: '50%' }}>
              {shortInputLabels.map((label) => (
                <InputBlock
                  key={label.name}
                  label={label}
                  value={project}
                  handleChange={(e) => handleChange(e.target)}
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
                  handleChange={(e) => handleChange(e.target)}
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
                  name="published"
                  onChange={(e) => handleChange({
                    value: e.target.checked
                  })}
                  label="Опубліковано"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5 mt-md-3">
            <Button variant="primary" type="submit">
              Зберегти
            </Button>
          </Row>
        </Form>
      </Container>
    </Page>
  );
}

export const runtime = process.env.RUNTIME;

export default AddProject;
