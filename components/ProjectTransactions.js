import {
  Button, Row, Container, Collapse,
} from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import transactions from '../mock/transactions';
import TableTransactions from './TableTransactions';

const ProjectTransactions = (props) => {
  // const { transactions } = props; // TODO: uncomment when will fix api
  const { project_id: id } = props;
  const [open, setOpen] = useState(false); // / TODO: lift up state

  return (
    <Container>
      <Row className="d-flex justify-content-around my-3">
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="collapse"
          aria-expanded={open}
          className="mb-3"
        >
          Транзакції проекту
        </Button>
        <Link
          href={{
            pathname: '/admin/transaction/add',
            query: { id },
          }}
          as="/admin/transaction/add"
        >
          <Button className="btn-success mb-3">Додати транзакцію</Button>
        </Link>
      </Row>
      <Collapse in={open}>
        <div id="collapse">
          <TableTransactions
            transactions={transactions}
            fullTable={false}
          />
        </div>
      </Collapse>
    </Container>
  );
};

export default ProjectTransactions;
