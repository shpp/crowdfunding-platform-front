import { useState } from 'react';
import {
  Form, Row, Col, Container, Button, Tabs, Tab,
} from 'react-bootstrap';
import Router from 'next/router';
import InputBlock from '../../../../components/InputBlock';
import Page from '../../../../layout/admin/Page';
import Editor from '../../../../components/Editor';
import { fetchDataPost } from '../../../../utils/fetchData';
import withAuth from '../../../../layout/admin/HOC/withAuth';
import { UPDATE_PROJECT } from '../../../../utils/api_urls';
import ModalComponent from '../../../../components/Modal';

const AdminProjectEdit = (defaultProject) => {
  const [project, setProjectData] = useState(defaultProject);
  const [showModal, setShowModal] = useState(
    {
      show: false,
      isSuccess: false,
    },
  );

  const labels = [
    {
      name: 'name',
      label: "Ім'я проекту",
      type: 'text',
      value: [project.name],
    },
    {
      name: '_id',
      label: 'Номер id',
      type: 'text',
      value: [project._id],
    },
    {
      name: 'creationTime',
      label: 'Дата створення',
      type: 'datetime-local',
      value: [project.creationTime.split('.')[0]],
    },
    {
      name: 'amount',
      label: 'Необхідно зібрати',
      type: 'number',
      value: [project.amount],
    },
    {
      name: 'currency',
      label: 'В валюті',
      type: 'text',
      value: [project.currency],
    },
    {
      name: 'amountFunded',
      label: 'Вже зібрали',
      type: 'number',
      value: [project.amountFunded],
    },
  ];

  const style = {
    backgroundColor: 'white',
    padding: '20px',
  };

  const handleClose = () => {
    Router.back();
    setShowModal({ show: false });
  };

  const handleShowModal = (control) => setShowModal(control);

  const handleChange = (event) => {
    setProjectData({ ...project, [event.target.name]: event.target.value });
  };

  const handleResponse = (response) => {
    if (response.success) {
      handleShowModal({
        show: true,
        isSuccess: true,
      });
    } else {
      handleShowModal({
        show: true,
        isSuccess: false,
        error: response.error,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectData = {
      id: project._id,
      name: project.name,
      planned_spendings: project.plannedSpendings,
      description: project.description,
      amount: project.amount,
      currency: project.currency,
      actual_spendings: project.actualSpendings,
    };
    const body = new URLSearchParams(projectData).toString();
    const response = await fetchDataPost(body, UPDATE_PROJECT);

    handleResponse(response);
  };

  return (
    <Page>
      <ModalComponent
        showModal={showModal}
        handleClose={handleClose}
      />
      <Container className="mt-4 con" style={style}>
        <h1 className="form-header text-center">
          Редагувати дані проекту
        </h1>
        <Form onSubmit={handleSubmit}>
          <Row className="flex-column flex-md-row">
            <Col>
              <InputBlock
                inputLabels={labels}
                handleChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Збір завершено?</Form.Label>
                <select
                  className="custom-select"
                  name="completed"
                  value={project.completed}
                  onChange={handleChange}
                >
                  <option value="true">ТАК</option>
                  <option value="false">НІТ</option>
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Чи опубліковано?</Form.Label>
                <select
                  className="custom-select"
                  name="published"
                  value={project.published}
                  onChange={handleChange}
                >
                  <option value="true">ТАК</option>
                  <option value="false">НІТ</option>
                </select>
              </Form.Group>
              <Tabs defaultActiveKey="purpose">
                <Tab eventKey="purpose" title="Мета кампанії">
                  <Editor defaultContent={project.plannedSpendings} />
                </Tab>
                <Tab eventKey="description" title="Опис проекту">
                  <Editor defaultContent={project.description} />
                </Tab>
                <Tab eventKey="actualSpending" title="Куди витрачено?">
                  <Editor defaultContent={project.actualSpendings} />
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
};

AdminProjectEdit.getInitialProps = async ({ query }) => query;

export default withAuth(AdminProjectEdit);
