import { Table, Button } from 'react-bootstrap';
import api from '../../fetch';

function getLocalDate(UTCDateString) {
  const date = new Date(UTCDateString);
  date.setHours(date.getHours() + 3);
  return date.toISOString().slice(0, -5).replace(/T/g, ' ');
}

const TableTransactions = ({ transactions, type, onListUpdated }) => {
  const revoke = async (transactionId) => {
    await api.post('revoke_transaction', { id: transactionId });
    await onListUpdated();
  };

  const reaffirm = async (transactionId) => {
    await api.post('reaffirm_transaction', { id: transactionId });
    await onListUpdated();
  };

  const columns = [
    { label: '#', cell: (transaction, index) => index + 1, excludedTypes: [] },
    { label: 'Проект', cell: (transaction) => transaction.project.name, excludedTypes: ['project', 'order'] },
    { label: 'Час', cell: (transaction) => getLocalDate(transaction.created_at), excludedTypes: [] },
    { label: 'Імя донатора', cell: (transaction) => `${transaction.donator?.name ?? ''} ${transaction.donator?.surname ?? ''}`, excludedTypes: ['order'] },
    { label: 'Телефон', cell: (transaction) => transaction.donator?.phone, excludedTypes: ['order'] },
    { label: 'Сума', cell: (transaction) => transaction.amount, excludedTypes: [] },
    { label: 'Статус', cell: (transaction) => transaction.status, excludedTypes: [] },
    { label: 'Змінити статус',
      cell: (transaction) => (transaction.status === 'success'
        ? <Button variant="outline-warning" size="sm" onClick={() => revoke(transaction.id)}>set `revoked`</Button>
        : <Button variant="outline-success" size="sm" onClick={() => reaffirm(transaction.id)}>set `success`</Button>),
      excludedTypes: [] },
  ].filter(({ excludedTypes }) => !excludedTypes.includes(type));

  return (
    <Table
      striped
      bordered
      size="sm"
    >
      <thead>
        <tr>
          {columns.map((c) => <th key={`h-${c.label}`}>{c.label}</th>)}
        </tr>
      </thead>
      <tbody>
        { transactions
      && transactions.filter(({ status }) => status !== 'subscribed')
        .map((transaction, index) => (
          <tr key={transaction.id}>
            {columns.map((c) => <td key={`v-${c.label}-${transaction.id}`}>{c.cell(transaction, index)}</td>)}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableTransactions;
