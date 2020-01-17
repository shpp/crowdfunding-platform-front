import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Page from '../../layout/admin/Page';
import colors from '../../theme/colors';
import { fetchDataPost } from '../../utils/fetchData';
import withAuth from '../../layout/admin/HOC/withAuth';
import { CREATE_PROJECT, UPDATE_PROJECT } from '../../utils/api_urls';

const styles = {
  form: {
    width: '100%',
  },
};

const AdminAddProjectPage = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.projectName.value;

    const newProject = {
      id: '',
      name,
      planned_spendings: form.elements.projectPlannedSpendings.value,
      description: form.elements.projectDescription.value,
      amount: form.elements.projectAmount.value,
      currency: 'UAH',
      actual_spendings: '',
    };
    // send request to createURL with just name of new project and receive back it's id
    const getNewProjectId = await fetchDataPost(encodeURI(`name=${name}`), CREATE_PROJECT);
    newProject.id = await getNewProjectId.project_id;
    // send request to updateURL with new project data
    await fetchDataPost(new URLSearchParams(newProject).toString(), UPDATE_PROJECT);
  };

  return (
    <Page>
      <div className="container">
        <h1 className="form-title">
          Створити проект
        </h1>
        <Form className="add-form" style={styles.form} onSubmit={onSubmit}>
          <Form.Group controlId="projectName">
            <Form.Label>Назва</Form.Label>
            <Form.Control type="text" placeholder="Назва проекту..." />
          </Form.Group>

          <Form.Group controlId="projectPlannedSpendings">
            <Form.Label>Планові витрати</Form.Label>
            <Form.Control type="text" placeholder="Купимо новий..." />
          </Form.Group>

          <Form.Group controlId="projectAmount">
            <Form.Label>Сума</Form.Label>
            <Form.Control type="number" placeholder="Потрібна сума..." />
          </Form.Group>

          <Form.Group controlId="projectDescription">
            <Form.Label>Опис</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Опис проекту..." />
          </Form.Group>

          <Button variant="primary" type="submit">
            Додати
          </Button>
        </Form>
      </div>
      <style jsx>
        {
          `
          .container {
            max-width: 85%;
            width: 900px;
            display: flex;
            flex-wrap: wrap;
            margin: 30px auto;
            background-color: ${colors.white};
            padding: 30px;
          }
          
          .form-title {
            margin-bottom: 30px;
          }
          `
        }
      </style>
    </Page>
  );
};

export default withAuth(AdminAddProjectPage);
