import Page from '../../layout/admin/Page';
import { PROJECTS_LIST, TRANSACTIONS_LIST } from '../../utils/api_urls';
import { fetchDataGet } from '../../utils/fetchData';
import TableTransactions from '../../components/TableTransactions';
import mockTransactions from '../../mock/transactions'; // TODO: replace with 'transaction' after api got fixed
import withAuth from '../../layout/admin/HOC/withAuth';

/* eslint-disable no-console */
const transactions = ({ namedTransactions }) => {
  console.log(namedTransactions);
  return (
    <Page>
      <h1 className="text-center">Транзакції</h1>
      <TableTransactions
        transactions={mockTransactions}
        fullTable
      />
    </Page>
  );
};

transactions.getInitialProps = async () => {
  // get all projects
  const res = await fetchDataGet(`${PROJECTS_LIST}`);
  const { projects } = res;
  // send request by each project id ti get transactions of each project
  const requests = projects.map(async (project) => fetchDataGet(`${TRANSACTIONS_LIST}${project._id}`));
  // collect all promises
  const responses = await Promise.all(
    requests.map(
      async (request) => request,
    ),
  );
  // bundle all transactions to array
  const transactionsArray = responses.reduce(
    (result, response) => [...result, ...response.transactions],
    [],
  );
  // get projects names
  const names = projects.map((project) => {
    return { [project._id]: project.name };
  });
  // add project name property to each transaction
  const namedTransactions = transactionsArray.map((transaction) => {
    return { ...transaction, name: names[transaction.projectId] };
  });

  return { namedTransactions };
};

export default withAuth(transactions);
