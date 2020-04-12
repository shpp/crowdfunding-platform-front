import { Button } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import TableTransactions from './TableTransactions';

const ProjectTransactions = (props) => {
  const { transactions } = props;
  const { project_id: id } = props;

  return (
    <div>
      {
        transactions.length
          ? <TableTransactions transactions={transactions} fullTable={false} />
          : <p>Поки не було жодної транзакції</p>
      }
      <Link
        href={{
          pathname: '/admin/transaction/add',
          query: {
            vasya: 'petro',
            id
          },
        }}
        as={`/admin/transaction/add?id=${id}`}
      >
        <Button className="btn-success mb-3">Додати транзакцію</Button>
      </Link>
    </div>
  );
};

export default ProjectTransactions;
