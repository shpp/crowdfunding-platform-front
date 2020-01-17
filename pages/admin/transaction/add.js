import { useState } from 'react';
import Router from 'next/router';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import Page from '../../../layout/admin/Page';
import withAuth from '../../../layout/admin/HOC/withAuth';
import { fetchDataPost } from '../../../utils/fetchData';
import { CREATE_TRANSACTION } from '../../../utils/api_urls';
import ModalComponent from '../../../components/Modal';

const style = {
  backgroundColor: 'white',
  padding: '20px',
};

const AddTransaction = ({ id }) => {
  const [transaction, setTransaction] = useState({
    id,
    amount: '',
    donator_name: '',
    donator_phone: '',
  });
  const [showModal, setShowModal] = useState(
    {
      show: false,
      isSuccess: false,
    },
  );
  const handleClose = () => {
    Router.back();
    setShowModal({ show: false });
  };

  const handleShowModal = (control) => setShowModal(control);

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

  const createTransaction = async () => {
    const response = await fetchDataPost(new URLSearchParams(transaction).toString(), CREATE_TRANSACTION);
    handleResponse(response);
  };

  const handleChange = ({ target }) => {
    setTransaction({ ...transaction, [target.name]: target.value });
  };

  return (
    <Page>
      <ModalComponent
        showModal={showModal}
        handleClose={handleClose}
      />
      <Container className="mt-5" style={style}>
        <Row>
          <Col className="col-8 mx-auto">
            <h1>Створити транзакцію</h1>
            <Form>
              <Form.Group>
                <Form.Label>Ім&apos;я донатора </Form.Label>
                <Form.Control name="donator_name" type="text" placeholder="Щедрий Пан" onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Номер телефону</Form.Label>
                <Form.Control name="donator_phone" type="tel" placeholder="+380667876655" onChange={handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Сума</Form.Label>
                <Form.Control name="amount" type="number" placeholder="999" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="d-flex justify-content-around">
                <Button className="btn-success" onClick={createTransaction}>Створити транзакцію</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

AddTransaction.getInitialProps = ({ query }) => query;

export default withAuth(AddTransaction);
