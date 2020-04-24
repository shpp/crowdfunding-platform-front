import React, { Component } from 'react';
import Page from '../../components/layout/admin/Page';
import api from '../../api';
import TableTransactions from '../../components/admin/TableTransactions';
import withAuth from '../../components/layout/admin/HOC/withAuth';
import { i18n } from '../../utils/translations';

/* eslint-disable no-console */
class Transactions extends Component {
  state = {
    namedTransactions: []
  };

  async componentDidMount() {
    // get all projects
    const { projects } = await api.get('admin_projects');
    // get all transactions
    const { transactions } = await api.get('transactions');
    // get projects names
    const projectNames = projects.reduce((acc, project) => ({ ...acc, [project._id]: project[`name_${i18n.language}`] }), {});
    // add project name property to each transaction
    const namedTransactions = transactions.map((transaction) => {
      return { ...transaction, project_name: projectNames[transaction.project_id] };
    });

    this.setState({ namedTransactions });
  }

  render() {
    return (
      <Page>
        <h1 className="text-center">Транзакції</h1>
        <TableTransactions
          transactions={this.state.namedTransactions}
          fullTable
        />
      </Page>
    );
  }
}

export default withAuth(Transactions);
