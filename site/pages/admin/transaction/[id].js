import React, { Component } from 'react';
import Page from '../../../components/layout/admin/Page';
import withAuth from '../../../components/layout/admin/HOC/withAuth';
import { withRouter } from 'next/router';
import api from '../../../api';

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

class TransactionView extends Component {
  state = {
    transaction: {}
  };

  async componentDidMount() {
    await this.getTransaction();
  }

  async getTransaction() {
    const { transaction } = await api.request(`admin/transactions/${this.props.router.query.id}`, 'get');
    console.log(transaction);
    this.setState({
      transaction
    });
  }

  render() {
    const { transaction } = this.state;

    return (
      <Page>
        { JSON.stringify(transaction, undefined, 2) }
      </Page>
    );
  }
}

export default withAuth(withRouter(TransactionView));
