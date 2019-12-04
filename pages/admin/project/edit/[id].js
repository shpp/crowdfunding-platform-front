import { useState } from 'react';
import { Form, Row, Col, Container, Button, Tabs, Tab } from 'react-bootstrap';
import InputBlock from './InputBlock';
import Page from '../../../../layout/admin/Page';
import Editor from './editor';
import colors from '../../../../theme/colors';

const AdminProjectEdit = (defaultProject) => {
  const [project, setProjectData] = useState(defaultProject);
  const labels = [
    {
      name: "name",
      label: "Ім'я проекту",
      type: "text",
      value: [project.name]
    },
    {
      name: "_id",
      label: "Номер id",
      type: "text",
      value: [project._id]
    },
    {
      name: "creationTime",
      label: "Дата створення",
      type: "date",
      value: [project.creationTime]
    },
    {
      name: "amount",
      label: "Необхідно зібрати",
      type: "number",
      value: [project.amount]
    },
    {
      name: "currency",
      label: "в валюті",
      type: "text",
      value: [project.currency]
    },
    {
      name: "amountFunded",
      label: "Вже зібрали",
      type: "number",
      value: [project.amountFunded]
    }
  ];

  const handleChange = (event) => {
    setProjectData({...project, [event.target.name]: event.target.value});
  };

  const handleSelectChange = (event) => {
    setProjectData({...project, [event.target.name]: event.target.value});
  };

  console.log(project);
  return (
    <Page>
      <Container className="mt-4">
        <h1 className="form-header">
          Редагувати дані проекту
        </h1>
        <Form>
          <Row className="flex-column flex-md-row">
            <Col>
              <Row>
                <Col>
                  <InputBlock
                    inputLabels={labels}
                    handleChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Вже зібрали?</Form.Label>
                    {console.log(project.completed)}
                    <select
                      className="custom-select"
                      name="completed"
                      value={project.completed}
                      onChange={(event) => handleSelectChange(event)}
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
                      onChange={(event) => handleSelectChange(event)}
                    >
                      <option value="true">ТАК</option>
                      <option value="false">НІТ</option>
                    </select>
                  </Form.Group>
                  <Tabs defaultActiveKey="purpose" id="uncontrolled-tab-example">
                    <Tab eventKey="purpose" title="Мета кампанії">
                      <Editor defaultContent={project.plannedSpendings}/>
                    </Tab>
                    <Tab eventKey="description" title="Опис проекту">
                      <Editor defaultContent={project.description}/>
                    </Tab>
                    <Tab eventKey="actualSpending" title="Куди витрачено?">
                      <Editor defaultContent={project.actualSpendings} />
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Button variant="primary" type="submit">Зберегти зміни</Button>
          </Row>
        </Form>
      </Container>
    </Page>
  )
};

AdminProjectEdit.getInitialProps = async function getInitialProps(props) {
    const { query } = props;
    return query;
};
    //here fetch data by id, and pass to props, than edit it and by click send new data to backend
export default AdminProjectEdit;
