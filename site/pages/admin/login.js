import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import createAndSetToken from '../../utils/createToken';
import api from '../../fetch';
import Page from '../../components/layout/admin/Page';

const Login = ({ router }) => {
  const [pass, setPass] = useState('');

  useEffect(() => {
    async function checkToken() {
      if (sessionStorage.getItem('token')) {
        await router.push('/admin/projects');
      }
    }
    checkToken();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createAndSetToken(pass);
    await api.get('admin_projects');
    await router.push('/admin/projects');
  };

  return (
    <Page>
      <Container className="mt-5 col-md-6 ">
        <Row>
          <Col className="col-6 mx-auto text-center">
            <h1>Вхід</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control name="password" type="password" placeholder="пароль..." onChange={({ target }) => setPass(target.value)} />
              </Form.Group>
              <Button className="btn-success" type="submit">Увійти</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export const runtime = 'edge';

export default withRouter(Login);
