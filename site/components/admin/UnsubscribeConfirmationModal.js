import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';

const style = {
  header: {
    border: 'none',
    justifyContent: 'center'
  },
  footer: {
    border: 'none',
    padding: '0 1rem 1rem'
  },
  button: {
    minWidth: '30%',
  },
  modal: {
    maxWidth: '100%',
    overflow: 'hidden'
  }
};

class UnsubscribeConfirmationModalComponent extends Component {
  render() {
    return (
      <Modal style={style.modal} show={this.props.show} centered>
        <Modal.Header style={style.header}>
          <div>
            <h3>Ви дійсно хочете скасувати підписку для {this.props.donator}?</h3>
          </div>
        </Modal.Header>
        <Modal.Footer style={style.footer}>
          <Button variant="outline-success mx-auto" onClick={this.props.handleUnsubscribe} style={style.button}>
            ТАК
          </Button>
          <Button variant="outline-success mx-auto" onClick={this.props.handleClose} style={style.button}>
            НІ
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default UnsubscribeConfirmationModalComponent;
