import { Component } from 'react';
import { withRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import api from '../../../../api';
import Page from '../../../../components/layout/admin/Page';

class Unsubscribe extends Component {
  state = {
    order: {
      id: this.props.router.query.id,
      amount: '',
      currency: '',
      donator: {
        name: '',
        surname: ''
      },
    }
  };

  async componentDidMount() {
    const { order } = await api.request(`admin/orders/${this.state.order.id}`, 'get');
    this.setState({
      order
    });
  }

  async unsubscribe() {
    await api.post('unsubscribe', { orderId: this.state.order.id });
    await this.props.router.push('/admin/subscriptions');
  }

  async gotoSubscriptions() {
    await this.props.router.push('/admin/subscriptions');
  }

  render() {
    const { order } = this.state;

    return (
      <Page>
        <div className="container">
          {/* eslint-disable-next-line max-len */}
          <h2>Ви підтверджуєте скасування щомісячного платежу на суму { order.amount } { order.currency } від { order.donator.name } { order.donator.surname }?</h2>
          <div style={{ textAlign: 'center' }} className="mb-2">
            <Button style={{ width: '100px' }} className="btn-success" onClick={this.unsubscribe.bind(this)}>ТАК</Button>
            <Button style={{ width: '100px' }} className="btn-success ml-2" onClick={this.gotoSubscriptions.bind(this)}>HI</Button>
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(Unsubscribe);
