import React, { Component } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import Page from '../../../layout/admin/Page';
import withAuth from '../../../layout/admin/HOC/withAuth';
import api from '../../../api';

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
  },
  link: {
    cursor: 'pointer',
    'text-decoration': 'underline'
  }
};

class TransactionView extends Component {
  state = {
    transaction: {}
  }

  async componentDidMount() {
    await this.getTransaction();
  }

  async getTransaction() {
    const { transactions } = await api.get('transactions');
    this.setState({
      transaction: transactions.filter((t) => t._id === this.props.router.query.id).pop()
    });
  }

  async revoke() {
    await api.post('revoke_transaction', { id: this.props.router.query.id });
    await this.getTransaction();
  }

  async reaffirm() {
    await api.post('reaffirm_transaction', { id: this.props.router.query.id });
    await this.getTransaction();
  }

  render() {
    const revokeButton = <Button className="btn-danger" onClick={this.revoke.bind(this)}>Приховати транзакцію</Button>;

    const reaffirmButton = <Button className="btn-success" onClick={this.reaffirm.bind(this)}>Зарахувати транзакцію</Button>;

    const { transaction } = this.state;

    return (
      <Page>
        <Container className="mt-5" style={styles.container}>
          <Col className="col-8 mx-auto ">
            <h1>Перегляд транзакції</h1>
            <p>Ім&apos;я донатора: <span className="text-success">{transaction.donatorName}</span></p>
            <p>Номер телефону: <span className="text-success">{transaction.donatorPhone}</span></p>
            <p>Статус: <span className="text-success">{transaction.status}</span></p>
            <p>Сума: <span className="text-success">{transaction.amount}</span></p>
            <p>Дата: <span className="text-success">{transaction.time}</span></p>
            <p>Проект:
              <Link
                href="/admin/project/view/[id]"
                as={`/admin/project/view/${transaction.projectId}`}
              ><span className="text-success" style={styles.link}>{transaction.projectId}</span>
              </Link>
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
  }
}

export default withAuth(TransactionView);
