import { Component } from 'react';
import { withRouter } from 'next/router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import createAndSetToken from '../../utils/createToken';
import api from '../../api';
import Page from '../../components/layout/admin/Page';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: ''
    };
  }

  async componentDidMount() {
    if (sessionStorage.getItem('token')) {
      await this.props.router.push('/admin/projects');
    }
  }

  handleChange({ target }) {
    this.setState({ pass: target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    createAndSetToken(this.state.pass);
    await api.get('admin_projects');
    await this.props.router.push('/admin/projects');
  }

  render() {
    return (
      <Page>
        <Container className="mt-5 col-md-6 ">
          <Row>
            <Col className="col-6 mx-auto text-center">
              <h1>Вхід</h1>
              <Form
                onSubmit={this.handleSubmit.bind(this)}
              >
                <Form.Group>
                  <Form.Control name="password" type="password" placeholder="пароль..." onChange={this.handleChange.bind(this)} />
                </Form.Group>
                <Button className="btn-success" type="submit">Увійти</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

export default withRouter(Login);
