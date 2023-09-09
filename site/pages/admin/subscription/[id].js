import { Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Page from '../../../components/layout/admin/Page';
import withAuth from '../../../components/layout/admin/HOC/withAuth';
import api from '../../../fetch';
import UnsubscribeConfirmationModalComponent from '../../../components/admin/UnsubscribeConfirmationModal';
import TableTransactions from '../../../components/admin/TableTransactions';

const styles = {
  section: {
    border: '1px solid grey',
    margin: '10px',
    padding: '10px'
  }
};

const SubscriptionPage = (props) => {
  const initialOrder = {
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
  };

  const [order, setOrder] = useState(initialOrder);
  const [isUnsubscribeRequest, setIsUnsubscribeRequest] = useState(false);

  async function init() {
    const { order: fetchedOrder } = await api.request(`admin/orders/${props.router.query.id}`, 'get');
    fetchedOrder.transactions.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    setOrder(fetchedOrder);
    setIsUnsubscribeRequest(false);
  }

  useEffect(() => {
    init();
  }, [props.router.query.id]);

  const handleUnsubscribe = async () => {
    await api.post('unsubscribe', { orderId: order.id });
    await init();
  };

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
                          onClick={() => setIsUnsubscribeRequest(false)}
                        >СКАСУВАТИ ПІДПИСКУ
                        </Button>
                        )}
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <section style={styles.section}>
              <p><strong>Транзакції:</strong></p>
              <TableTransactions transactions={order.transactions} type="order" onListUpdated={init} />
            </section>
          </Card.Body>
        </Card>
      </div>
      <UnsubscribeConfirmationModalComponent
        show={isUnsubscribeRequest}
        donator={`${order.donator.name} ${order.donator.surname}`}
        handleUnsubscribe={handleUnsubscribe}
        handleClose={() => setIsUnsubscribeRequest(false)}
      />
    </Page>
  );
};

export const runtime = 'experimental-edge';

export default withAuth(withRouter(SubscriptionPage));
