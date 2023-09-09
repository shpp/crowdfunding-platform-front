import { useEffect, useState } from 'react';
import Page from '../../components/layout/admin/Page';
import api from '../../fetch';
import TableTransactions from '../../components/admin/TableTransactions';
import withAuth from '../../components/layout/admin/HOC/withAuth';

/* eslint-disable no-console */
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  async function fetchData() {
    setTransactions((await api.get('transactions')).transactions);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page>
      <h1 className="text-center">Транзакції</h1>
      <TableTransactions transactions={transactions} type="all" onListUpdated={fetchData} />
    </Page>
  );
};

export const config = { runtime: process.env.RUNTIME };

export default withAuth(Transactions);
