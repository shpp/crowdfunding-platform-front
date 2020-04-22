import React, { Component } from 'react';
import { withRouter } from 'next/router';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import Page from '../../../components/layout/admin/Page';
import withAuth from '../../../components/layout/admin/HOC/withAuth';
import api from '../../../api';

const style = {
  backgroundColor: 'white',
  padding: '20px',
};

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        project_id: this.props.router.query.id,
        amount: '',
        donator_name: '',
        donator_phone: '',
      }
    };
  }

  async createTransaction() {
    await api.post('create_transaction', {
      ...this.state.transaction,
      amount: +this.state.transaction.amount
    });
  }

  handleChange({ target }) {
    const { transaction } = this.state;
    this.setState({
      transaction: {
        ...transaction,
        [target.name]: target.value
      }
    });
  }

  render() {
    return (
      <Page>
        <Container className="mt-5" style={style}>
          <Row>
            <Col className="col-8 mx-auto">
              <h1>Створити транзакцію</h1>
              <Form>
                <Form.Group>
                  <Form.Label>Ім&apos;я донатора </Form.Label>
                  <Form.Control name="donator_name" type="text" placeholder="Щедрий Пан" onChange={this.handleChange.bind(this)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Номер телефону</Form.Label>
                  <Form.Control name="donator_phone" type="tel" placeholder="+380667876655" onChange={this.handleChange.bind(this)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Сума</Form.Label>
                  <Form.Control name="amount" type="number" placeholder="999" onChange={this.handleChange.bind(this)} />
                </Form.Group>
                <Form.Group className="d-flex justify-content-around">
                  <Button className="btn-success" onClick={this.createTransaction.bind(this)}>Створити транзакцію</Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

export default withAuth(withRouter(AddTransaction));
