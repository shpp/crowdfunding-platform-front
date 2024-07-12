import React, { Component } from 'react';
import Page from '../../components/layout/admin/Page';
import api from '../../api';
import TableTransactions from '../../components/admin/TableTransactions';
import withAuth from '../../components/layout/admin/HOC/withAuth';

/* eslint-disable no-console */
class Transactions extends Component {
  state = {
    transactions: []
  };

  async componentDidMount() {
    // get all transactions
    const { transactions } = await api.get('transactions');
    this.setState({ transactions });
  }

  render() {
    return (
      <Page>
        <h1 className="text-center">Транзакції</h1>
        <TableTransactions
          transactions={this.state.transactions}
          fullTable
        />
      </Page>
    );
  }
}

export default withAuth(Transactions);
