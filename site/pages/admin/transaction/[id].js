import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Page from '../../../components/layout/admin/Page';
import withAuth from '../../../components/layout/admin/HOC/withAuth';
import api from '../../../api';

class TransactionView extends Component {
  state = {
    transaction: {}
  };

  async componentDidMount() {
    await this.getTransaction();
  }

  async getTransaction() {
    const { transaction } = await api.request(`admin/transactions/${this.props.router.query.id}`, 'get');
    this.setState({
      transaction
    });
  }

  render() {
    const { transaction } = this.state;

    return (
      <Page>
        <h3>Transaction data</h3>
        <pre>{ JSON.stringify(transaction, undefined, 2) }</pre>
      </Page>
    );
  }
}

export default withAuth(withRouter(TransactionView));
