import { Table } from 'react-bootstrap';
import Link from 'next/link';

const style = {
  cursor: 'pointer'
};
function getLocalDate(UTCDateString) {
  const date = new Date(UTCDateString);
  date.setHours(date.getHours() + 3);
  return date.toISOString().slice(0, -5).replace(/T/g, ' ');
}

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
          key={transaction.id}
          href="/admin/transaction/view/[id]"
          as={`/admin/transaction/view/${transaction.id}`}
        >
          <tr key={transaction.id} style={style}>
            <td>{ index + 1 }</td>
            { fullTable && <td>{transaction.project.name}</td>}
            <td>{getLocalDate(transaction.created_at)}</td>
            <td>{transaction.donator?.name} {transaction.donator?.surname}</td>
            <td>{transaction.donator?.phone}</td>
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
