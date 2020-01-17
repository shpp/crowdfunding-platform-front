/* eslint-disable no-console */
import { useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import Page from '../../layout/admin/Page';
import createToken from '../../utils/createToken';

const Login = () => {
  const [pass, setPass] = useState('');
  const handleChange = ({ target }) => {
    setPass(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createToken(pass);
    console.log(localStorage.getItem('token'));
  };
  return (
    <Page>
      <Container className="mt-5 col-md-6 ">
        <Row>
          <Col className="col-6 mx-auto text-center">
            <h1>Вхід</h1>
            <Form
              onSubmit={handleSubmit}
            >
              <Form.Group>
                <Form.Control name="password" type="password" placeholder="пароль..." onChange={handleChange} />
              </Form.Group>
              <Button className="btn-success" type="submit">Увійти</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default Login;
