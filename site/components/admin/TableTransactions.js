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
          <th>Імя</th>
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
            { fullTable && <td>{transaction.name}</td>}
            <td>{transaction.time}</td>
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
