import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import api from '../../../../fetch';
import Page from '../../../../components/layout/admin/Page';

const Unsubscribe = ({ router }) => {
  const initialOrder = {
    id: router.query.id,
    amount: '',
    currency: '',
    donator: {
      name: '',
      surname: ''
    },
  };

  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    async function fetchData() {
      setOrder((await api.request(`admin/orders/${initialOrder.id}`, 'get')).order);
    }

    fetchData();
  }, []);

  const unsubscribe = async () => {
    await api.post('unsubscribe', { orderId: order.id });
    await router.push('/admin/subscriptions');
  };

  return (
    <Page>
      <div className="container">
        <h2>
          Ви підтверджуєте скасування щомісячного платежу
          на суму {order.amount} {order.currency}
          від {order.donator.name} {order.donator.surname}?
        </h2>
        <div style={{ textAlign: 'center' }} className="mb-2">
          <Button style={{ width: '100px' }} className="btn-success" onClick={unsubscribe}>ТАК</Button>
          <Button style={{ width: '100px' }} className="btn-success ml-2" onClick={() => router.push('/admin/subscriptions')}>HI</Button>
        </div>
      </div>
    </Page>
  );
};

export const runtime = 'experimental-edge';

export default withRouter(Unsubscribe);
