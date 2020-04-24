import { Table } from 'react-bootstrap';
import Link from 'next/link';

const style = {
  cursor: 'pointer'
};

const TableTransactions = ({ transactions, fullTable }) => {
  return (
    <Table
      striped
      bordered
      hover
      size="sm"
    >
      <thead>
        <tr>
          <th>#</th>
          {fullTable && <th>Проект</th>}
          <th>Час</th>
          <th>Імя донатора</th>
          <th>Телефон</th>
          <th>Сума</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        { transactions
      && transactions.map((transaction, index) => (
        <Link
          key={transaction._id}
          href="/admin/transaction/[id]"
          as={`/admin/transaction/${transaction._id}`}
        >
          <tr key={transaction._id} style={style}>
            <td>{ index + 1 }</td>
            { fullTable && <td>{transaction.project_name}</td>}
            <td>{transaction.created_at.slice(0, -5).replace(/T/g, ' ')}</td>
            <td>{transaction.donator_name} {transaction.donator_surname}</td>
            <td>{transaction.donator_phone}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.status}</td>
          </tr>
        </Link>
      ))}
      </tbody>
    </Table>
  );
};

export default TableTransactions;
