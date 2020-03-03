import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';

const style = {
  borderNone: {
    border: 'none',
  },
  success: {
    color: 'green',
    marin: 'auto',
  },
  fail: {
    color: 'red',
    marin: 'auto',
  },
  button: {
    minWidth: '20%',
  },
};

class ModalComponent extends Component {
  render() {
    const successInfo = <h3 style={style.success}>Операція успішна</h3>;
    const failInfo = (
      <div>
        <h3 style={style.fail}>Операція невдала</h3>
        <p>{this.props.error}</p>
      </div>
    );

    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} centered>
        <Modal.Header style={style.borderNone}>
          {
            this.props.isSuccess
              ? successInfo
              : failInfo
          }
        </Modal.Header>
        <Modal.Footer style={style.borderNone}>
          <Button variant="primary mx-auto" onClick={this.props.handleClose} style={style.button}>
            Ок
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ModalComponent;
