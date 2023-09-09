import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Page from '../../components/layout/admin/Page';
import api from '../../fetch';
import withAuth from '../../components/layout/admin/HOC/withAuth';

function getLocalDate(UTCDateString) {
  const date = new Date(UTCDateString);
  date.setHours(date.getHours() + 3);
  return date.toISOString().slice(0, -5).replace(/T/g, ' ');
}

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const sortedSubscriptions = (await api.get('subscriptions')).subscriptions.sort((a, b) => {
        if (a.status === b.status) {
          return 0;
        }

        if (a.status === 'subscribed') {
          return -1;
        }

        return 1;
      });

      setSubscriptions(sortedSubscriptions);
    }

    fetchData();
  }, []);

  return (
    <Page>
      <h1 className="text-center">Підписки</h1>
      <Table
        striped
        bordered
        hover
        size="sm"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Донатор</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Сума</th>
            <th>Статус</th>
            <th>Дата підписки</th>
            <th>Остання транзакція</th>
          </tr>
        </thead>
        <tbody>
          { subscriptions && subscriptions.map((subscription, index) => (
            <tr
              key={subscription.id}
              style={{
                cursor: 'pointer',
                backgroundColor: subscription.status === 'subscribed' ? '#e5f7e9' : '#fafad2'
              }}
              onClick={() => router.push(`/admin/subscription/${subscription.id}`)}
            >
              <td>{ index + 1 }</td>
              <td>{subscription.donator?.name} {subscription.donator?.surname}</td>
              <td>{subscription.donator?.phone}</td>
              <td>{subscription.donator?.email}</td>
              <td>{subscription.amount} {subscription.currency}</td>
              <td>{subscription.status}</td>
              <td>{subscription.created_at ? getLocalDate(subscription.created_at) : ''}</td>
              <td style={{
                backgroundColor: subscription.transaction.status === 'success' ? 'inherit' : '#fafad2'
              }}
              >{subscription.transaction ? `${getLocalDate(subscription.transaction.created_at)} - ${subscription.transaction.status}` : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
};

export const runtime = process.env.RUNTIME;

export default withAuth(Subscriptions);
