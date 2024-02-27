import React, { Component } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import Page from '../../../../components/layout/admin/Page';
import withAuth from '../../../../components/layout/admin/HOC/withAuth';
import { withRouter } from 'next/router';
import api from '../../../../api';

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

class TransactionView extends Component {
  state = {
    transaction: {}
  };

  async componentDidMount() {
    console.log('transaction component did mount');
    await this.getTransaction();
  }

  async getTransaction() {
    const { transaction } = await api.request(`admin/transactions/${this.props.router.query.id}`, 'get');
    console.log(transaction);
    this.setState({
      transaction
    });
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
            <p>Ім&apos;я донатора: <span className="text-success">{transaction.donator?.name} {transaction.donator?.surname}</span></p>
            <p>Номер телефону: <span className="text-success">{transaction.donator?.phone}</span></p>
            <p>Статус: <span className="text-success">{transaction.status}</span></p>
            <p>Сума: <span className="text-success">{transaction.amount}</span></p>
            <p>Дата: <span className="text-success">{transaction.created_at}</span></p>
            <p>Проект:
              <Link
                href="/admin/project/view/[id]"
                as={`/admin/project/view/${transaction.project.id}`}
              ><span className="text-success" style={styles.link}>{transaction.project?.name}</span>
              </Link>
            </p>
            <div className="d-flex justify-content-around">
              <Link
                href="/admin/transaction/edit/[id]"
                as={`/admin/transaction/edit/${transaction.id}`}
              >
                <Button className="btn-warning">Редагувати транзакцію</Button>
              </Link>
              {
                transaction.status === 'success'
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

export default withAuth(withRouter(TransactionView));
