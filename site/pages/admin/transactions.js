import React, { Component } from 'react';
import Page from '../../layout/admin/Page';
import api from '../../api';
import TableTransactions from '../../components/TableTransactions';
import withAuth from '../../layout/admin/HOC/withAuth';

/* eslint-disable no-console */
class Transactions extends Component {
  state = {
    namedTransactions: []
  };

  async componentDidMount() {
    // get all projects
    const { projects } = await api.get('admin_projects');
    // send request by each project id ti get transactions of each project
    const requests = projects.map((project) => api.get('transactions', { project_id: project._id }));
    // collect all promises
    const responses = await Promise.all(requests);
    // bundle all transactions to array
    const transactionsArray = responses.reduce(
      (result, response) => [...result, ...response.transactions],
      [],
    );
    // get projects names
    const names = projects.reduce((acc, project) => ({ ...acc, [project._id]: project.name }), {});
    // add project name property to each transaction
    const namedTransactions = transactionsArray.map((transaction) => {
      return { ...transaction, name: names[transaction.projectId] };
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
