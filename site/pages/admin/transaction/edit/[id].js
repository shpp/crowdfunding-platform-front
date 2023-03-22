import React, { Component } from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import Page from '../../../../components/layout/admin/Page';
import withAuth from '../../../../components/layout/admin/HOC/withAuth';
import api from '../../../../api';

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
  },
};

class TransactionEdit extends Component {
  state = {
    transaction: {
      donator_name: '',
      donator_phone: ''
    }
  };

  async componentDidMount() {
    await this.getTransaction();
  }

  async getTransaction() {
    const { transactions } = await api.get('transactions');
    const newTransaction = transactions.filter((t) => t.id == this.props.router.query.id).pop();
    const oldTransaction = this.state.transaction;
    const setTransaction = {};
    Object.keys(newTransaction).forEach((key) => {
      setTransaction[key] = newTransaction[key] || oldTransaction[key] || '';
    });
    this.setState({
      transaction: setTransaction
    });
  }

  async save() {
    await api.post('update_transaction', this.state.transaction);
    await this.getTransaction();
  }

  render() {
    const { transaction } = this.state;

    return (
      <Page>
        <Container className="mt-5" style={styles.container}>
          <Col className="col-8 mx-auto ">
            <h2>Редагування транзакції</h2>
            <div>
              <label>
                <strong>Ім&apos;я донатора: </strong><br />
                <input
                  type="text"
                  value={transaction.donator_name}
                  onChange={(e) => this.setState({
                    transaction: {
                      ...transaction,
                      donator_name: e.target.value
                    }
                  })}
                />
              </label>
            </div>
            <div>
              <label>
                <strong>Номер телефону: </strong><br />
                <input
                  type="text"
                  value={transaction.donator_phone}
                  onChange={(e) => this.setState({
                    transaction: {
                      ...transaction,
                      donator_phone: e.target.value
                    }
                  })}
                />
              </label>
            </div>
            <div>
              <Button className="btn-success" onClick={this.save.bind(this)}>Зберегти</Button>
            </div>
          </Col>
        </Container>
      </Page>
    );
  }
}

export default withAuth(TransactionEdit);
