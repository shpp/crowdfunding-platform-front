import { Modal, Button } from 'react-bootstrap';

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


const ModalComponent = ({ handleClose, showModal: { show, isSuccess, error } }) => {
  const successInfo = <h3 style={style.success}>Операція успішна</h3>;
  const failInfo = (
    <div>
      <h3 style={style.fail}>Операція невдала</h3>
      <p>{error}</p>
    </div>
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header style={style.borderNone}>
        {
          isSuccess
            ? successInfo
            : failInfo
        }
      </Modal.Header>
      <Modal.Footer style={style.borderNone}>
        <Button variant="primary mx-auto" onClick={handleClose} style={style.button}>
         Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalComponent;
