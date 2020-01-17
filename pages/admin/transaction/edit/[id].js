import { useState } from 'react';
import Router from 'next/router';
import { Container, Col, Button } from 'react-bootstrap';
import Page from '../../../../layout/admin/Page';
import withAuth from '../../../../layout/admin/HOC/withAuth';
import { fetchDataPost } from '../../../../utils/fetchData';
import { REAFFIRM_TRANSACTION, REVOKE_TRANSACTION } from '../../../../utils/api_urls';
import ModalComponent from '../../../../components/Modal';

const style = {
  backgroundColor: 'white',
  padding: '20px',
};

const TransactionView = ({ transaction }) => {
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

  const revoke = async () => {
    const response = await fetchDataPost(encodeURI(`id=${transaction.id}`), REVOKE_TRANSACTION);
    handleResponse(response);
  };

  const reaffirm = async () => {
    const response = await fetchDataPost(encodeURI(`id=${transaction.id}`), REAFFIRM_TRANSACTION);
    handleResponse(response);
  };

  const revokeButton = <Button className="btn-danger" onClick={revoke}>Скасувати транзакцію</Button>;

  const reaffirmButton = <Button className="btn-success" onClick={reaffirm}>Провести транзакцію</Button>;

  return (
    <Page>
      <ModalComponent
        showModal={showModal}
        dhandleClose={handleClose}
      />
      <Container className="mt-5" style={style}>
        <Col className="col-8 mx-auto text-center">
          <h1>Перегляд транзакції</h1>
          <p className="text-muted">
Ім&apos;я донатора:
            <span className="text-success">{transaction.name}</span>
          </p>
          <p className="text-muted">
Номер телефону:
            <span className="text-success">{transaction.phone}</span>
          </p>
          <p className="text-muted">
Статус:
            <span className="text-success">{transaction.status}</span>
          </p>
          <p className="text-muted">
Сума:
            <span className="text-success display-4">{transaction.amount}</span>
          </p>
          <div className="d-flex justify-content-around">
            {
             transaction.status === 'confirmed'
               ? revokeButton
               : reaffirmButton
           }
          </div>
        </Col>
      </Container>
    </Page>
  );
};

TransactionView.getInitialProps = async ({ query: transaction }) => {
  return {
    transaction,
  };
};

export default withAuth(TransactionView);
