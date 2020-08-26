import {
  Form, Row, Col, Container, Button, Tabs, Tab,
} from 'react-bootstrap';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import InputBlock from '../../../../components/admin/InputBlock';
import Page from '../../../../components/layout/admin/Page';
import Editor from '../../../../components/admin/Editor';
import withAuth from '../../../../components/layout/admin/HOC/withAuth';
import api from '../../../../api';
import { i18n } from '../../../../utils/translations';

const style = {
  backgroundColor: 'white',
  padding: '20px',
};

const defaultProjectValue = {
  planned_spendings_uk: '',
  planned_spendings_en: '',
  description_uk: '',
  description_en: '',
  name_uk: '',
  name_en: '',
  actual_spendings_uk: '',
  actual_spendings_en: '',
  short_description_uk: '',
  short_description_en: '',
  published: false,
  archived: false,
  created_at: '',
  amount: 0,
  _ready: false
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

    const { projects } = await api.get('admin_projects');
    const project = projects.find((item) => item._id === query.id);

    this.setState({
      project: {
        ...defaultProjectValue,
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
      id: project._id,
      image: project.image || '',
      currency: 'UAH',
      amount: +project.amount,
      created_at: +new Date(project.created_at),
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

    const simpleLabels = [
      { name: 'amount', label: 'Сума, яку необхідно зібрати', type: 'number' },
      { name: 'image', label: 'Картинка-обкладинка (URL)', type: 'text', description: 'Краще за все видно картинки зі співвідношенням 16:9' },
      { name: 'created_at', label: 'Дата створення', type: 'date' }
    ];
    const langLabels = [
      { name: 'name', label: "Ім'я проекту", type: 'text' },
      { name: 'short_description', label: 'Короткий опис', type: 'text', description: '1-2 речення, які коротко описують весь проект' },
    ];
    const longreadLables = [
      { key: 'description', title: 'Опис проекту' },
      { key: 'planned_spendings', title: 'Заплановані витрати' },
      { key: 'actual_spendings', title: 'Куди реально витратили кошти? ' }
    ];

    return (
      <Page>
        <Container className="mt-4 con edit-project" style={style}>
          <h1 className="form-header text-center">
            Редагувати дані проекту
          </h1>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col>
                {simpleLabels.map((label) => (
                  <InputBlock
                    key={label.name}
                    label={label}
                    value={project}
                    handleChange={(e) => this.handleChange(e.target)}
                  />
                ))}
              </Col>

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
            <br />
            <Tabs defaultActiveKey={i18n.language} id="lang">
              {['uk', 'en'].map((lang) => (
                <Tab eventKey={lang} title={`Мова: ${lang}`} key={lang}>
                  <Row className="flex-column flex-md-row">
                    <Col>
                      {langLabels.map((label) => (
                        <InputBlock
                          key={label.name}
                          label={label}
                          lang={lang}
                          value={project}
                          handleChange={(e) => this.handleChange(e.target)}
                        />
                      ))}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Tabs defaultActiveKey="description" id="longread-field">
                        {longreadLables.map((label) => (
                          <Tab eventKey={label.key} title={`${label.title} (${lang})`} key={label.key}>
                            <Editor
                              content={project[`${label.key}_${lang}`]}
                              onChange={(value) => this.handleChange({ value, name: `${label.key}_${lang}` })}
                            />
                          </Tab>
                        ))}
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
                </Tab>
              ))}
            </Tabs>
          </Form>
        </Container>
      </Page>
    );
  }
}

export default withAuth(withRouter(AdminProjectEdit));
