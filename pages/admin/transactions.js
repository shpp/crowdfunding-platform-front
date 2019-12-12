import { Table, Button, Accordion, Card, Container } from 'react-bootstrap';

const ProjectTransactions = (props) => {
  const { transactions } = props;

  return (
      <Container>
        <Accordion>
          <Card>
            <Card.Header className="justify-content-center d-flex">
              <Accordion.Toggle
                as={Button}
                variant="secondary"
                eventKey="0"
              >
              Транзакції проекта
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                >
                  <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Імя</th>
                    <th>Телефон</th>
                    <th>Сума</th>
                  </tr>
                  </thead>
                  <tbody>
                  { transactions &&
                    transactions.map((transaction, index) => (
                    <tr key={transaction._id} className="project-table-row">
                      <td>{ index + 1 }</td>
                      <td>{transaction.donatorName}</td>
                      <td>{transaction.donatorPhone}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))
                  }
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
  );
};

export default ProjectTransactions;
