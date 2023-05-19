import { Button, Card, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Page from '../../../components/layout/admin/Page';
import withAuth from '../../../components/layout/admin/HOC/withAuth';
import api from '../../../api';
import UnsubscribeConfirmationModalComponent from '../../../components/admin/UnsubscribeConfirmationModal';

const styles = {
  section: {
    border: '1px solid grey',
    margin: '10px',
    padding: '10px'
  }
};

function getLocalDate(UTCDateString) {
  const date = new Date(UTCDateString);
  date.setHours(date.getHours() + 3);
  return date.toISOString().slice(0, -5).replace(/T/g, ' ');
}

class SubscriptionPage extends Component {
    state = {
      order: {
        id: 0,
        donator: {
          name: '',
          surname: '',
          email: '',
          phone: ''
        },
        amount: 0,
        currency: 'UAH',
        created_at: '',
        updated_at: '',
        status: '',
        transactions: []
      },
      isUnsubscribeRequest: false
    };

    async componentDidMount() {
      await this.init();
    }

    async init() {
      const { order } = await api.request(`admin/orders/${this.props.router.query.id}`, 'get');
      order.transactions = order.transactions.sort((a, b) => {
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      });
      this.setState({
        order,
        isUnsubscribeRequest: false
      });
    }

    async handleUnsubscribe() {
      await api.post('unsubscribe', { orderId: this.state.order.id });
      await this.init();
    }

    handleUnsubscribeModalClose() {
      this.setState({
        isUnsubscribeRequest: false
      });
    }

    handleUnsubscribeButtonClick() {
      this.setState({
        isUnsubscribeRequest: true
      });
    }

    render() {
      const { order, isUnsubscribeRequest } = this.state;

      return (
        <Page>
          <div className="container-fluid" style={{ marginTop: '30px' }}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div>
                  <div>
                    <h2>{ order.donator.name || '' } { order.donator.surname || '' }</h2>
                    <p className="mr-1">
                      {order.donator.email && <span>{ order.donator.email } </span>}
                      {order.donator.phone && <span>{ order.donator.phone }</span>}
                    </p>
                    <p className="mr-1"><strong>Статус:</strong> { order.status }</p>
                    <p className="mr-1"><strong>Сума:</strong> { order.amount } { order.currency }</p>
                    {order.status === 'subscribed'
                        && (
                        <Button
                          key={order.id}
                          className="btn-sm btn-success"
                          onClick={this.handleUnsubscribeButtonClick.bind(this)}
                        >СКАСУВАТИ ПІДПИСКУ
                        </Button>
                        )}
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <section style={styles.section}>
                  <p><strong>Транзакції:</strong></p>
                  <Table
                    striped
                    bordered
                    hover
                    size="sm"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Час</th>
                        <th>Сума</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      { order.transactions && order.transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                          <td>{ index + 1 }</td>
                          <td>{getLocalDate(transaction.created_at)}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.status} {transaction.error && (<span> - {transaction.error}</span>)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </section>
              </Card.Body>
            </Card>
          </div>
          <UnsubscribeConfirmationModalComponent
            show={isUnsubscribeRequest}
            donator={`${order.donator.name} ${order.donator.surname}`}
            handleUnsubscribe={this.handleUnsubscribe.bind(this)}
            handleClose={this.handleUnsubscribeModalClose.bind(this)}
          />
        </Page>
      );
    }
}

export default withAuth(withRouter(SubscriptionPage));
