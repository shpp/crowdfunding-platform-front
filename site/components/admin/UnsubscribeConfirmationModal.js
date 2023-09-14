import { Modal, Button } from 'react-bootstrap';

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

const UnsubscribeConfirmationModalComponent = () => ({ show, donator, handleUnsubscribe, handleClose }) => (
  <Modal style={style.modal} show={show} centered>
    <Modal.Header style={style.header}>
      <div>
        <h3>Ви дійсно хочете скасувати підписку для {donator}?</h3>
      </div>
    </Modal.Header>
    <Modal.Footer style={style.footer}>
      <Button variant="outline-success mx-auto" onClick={handleUnsubscribe} style={style.button}>
        ТАК
      </Button>
      <Button variant="outline-success mx-auto" onClick={handleClose} style={style.button}>
        НІ
      </Button>
    </Modal.Footer>
  </Modal>
);

export default UnsubscribeConfirmationModalComponent;
