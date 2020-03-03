import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Page from '../../../layout/admin/Page';
import colors from '../../../theme/colors';
import api from '../../../api';
import withAuth from '../../../layout/admin/HOC/withAuth';
import Editor from '../../../components/Editor';

const styles = {
  form: {
    width: '100%',
  },
};

class AdminAddProjectPage extends Component {
  state = {
    plannedSpendings: '',
    description: ''
  };

  async onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.projectName.value;

    const newProject = {
      name,
      plannedSpendings: this.state.plannedSpendings,
      description: this.state.description,
      amount: form.elements.projectAmount.value,
      image: form.elements.image.value,
      currency: 'UAH',
      state: 'unpublished',
      actualSpendings: '',
    };
    // send request to createURL with just name of new project and receive back it's id
    // eslint-disable-next-line camelcase
    const { project_id } = await api.post('create_project', { name: encodeURI(name) });
    // send request to updateURL with new project data
    await api.post('update_project', {
      ...newProject,
      id: project_id,
    });
  }

  render() {
    return (
      <Page>
        <div className="container">
          <h1 className="form-title">
            Створити проект
          </h1>
          <Form className="add-form" style={styles.form} onSubmit={this.onSubmit.bind(this)}>
            <Form.Group controlId="projectName">
              <Form.Label>Назва</Form.Label>
              <Form.Control type="text" placeholder="Vesnasoft 2020" />
            </Form.Group>

            <Form.Group controlId="projectAmount">
              <Form.Label>Сума</Form.Label>
              <Form.Control type="number" placeholder="2500" />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Картинка-обкладинка (URL)</Form.Label>
              <Form.Control type="text" placeholder="https://loremflickr.com/200/100" />
              <Form.Control.Feedback>
                Краще за все видно картинки зі співвідношенням 16:9
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Опис проекту</Form.Label>
              <Editor
                content={this.state.description}
                onChange={(description) => this.setState({ description })}
              />
            </Form.Group>
            <br /><br />
            <Form.Group>
              <Form.Label>Список запланованих витрат</Form.Label>
              <Editor
                content={this.state.plannedSpendings}
                onChange={(plannedSpendings) => this.setState({ plannedSpendings })}
              />
            </Form.Group>
            <br /><br />
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
  }
}

export default withAuth(AdminAddProjectPage);
