import { Card, Table, Container } from 'react-bootstrap';
import Link from 'next/link';

/* eslint-disable no-console */
const TableTransactions = ({ transactions, fullTable }) => {
  console.log(transactions);
  return (
    <Container>
      <Card>
        <Card.Header className="justify-content-around d-flex" />
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
                {fullTable && <th>Проект</th>}
                {fullTable && <th>Статус</th>}
                {fullTable && <th>Час</th>}
                <th>Імя</th>
                <th>Телефон</th>
                <th>Сума</th>
              </tr>
            </thead>
            <tbody>
              { transactions
            && transactions.map((transaction, index) => (
              <Link
                key={transaction._id}
                href={{
                  pathname: '/admin/transaction/edit/[id]',
                  query: {
                    name: transaction.donatorName,
                    phone: transaction.donatorPhone,
                    amount: transaction.amount,
                    status: transaction.status,
                  },
                }}
                as={`/admin/transaction/edit/${transaction.projectId}`}
              >
                <tr key={transaction._id} className="project-table-row">
                  <td>{ index + 1 }</td>
                  { fullTable && <td>{transaction.name}</td>}
                  { fullTable && <td>{transaction.status}</td>}
                  { fullTable && <td>{transaction.time}</td>}
                  <td>{transaction.donatorName}</td>
                  <td>{transaction.donatorPhone}</td>
                  <td>{transaction.amount}</td>
                </tr>
              </Link>
            ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <style jsx>
        {
          `
          .project-table-row {
              cursor: pointer;
            }
          `
        }
      </style>
    </Container>

  );
};

export default TableTransactions;
