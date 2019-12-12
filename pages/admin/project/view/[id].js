import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Page from '../../../../layout/admin/Page';
import colors from '../../../../theme/colors';
import ProgressBar from '../../../../components/ProgressBar';
import ProjectTransactions from '../../transactions';

const AdminViewProjectPage = (props) => {
  const { project, transactions } = props;

  const creationDate = () => {
    const event = new Date(project.creationTime);
    return `${event.getDate()}.${event.getMonth()}.${event.getFullYear()}`;
  };

  return (
    <Page>
      <div className="container-fluid my-5">
        <Card className="text-center">
          <Card.Header>
            <h1 className="form-title">{project.name}</h1>
          </Card.Header>
          <Card.Body>
            <div className="d-flex align-content-start justify-content-between">
              <h5>
                <span className="mr-1">
                  {project.currency}
                </span>
                <span className="text-green">{project.amountFunded}</span>
                <span className="text-muted">
                  <span>/</span>{project.amount}
                </span>
              </h5>
              <h5>
                <span className="text-success">{project.published ? 'Опубліковано' : 'Приховано' }</span>
              </h5>
            </div>
            <div className="col-md-10 mb-3 mx-auto">
              <ProgressBar amount={project.amount} funded={project.amountFunded} />
            </div>
            <Card.Title>{project.plannedSpendings}</Card.Title>
            <Card.Text>{project.description}</Card.Text>
            <Link
              href={{ pathname: '/admin/project/edit/[id]', query: project }}
              as={`/admin/project/edit/${project._id}`}
            >
              <a className="btn btn-secondary">Редагувати</a>
            </Link>
          </Card.Body>
          <Card.Footer className="text-muted d-flex justify-content-between">
            <span>
              <span>id:</span>{ project._id }
            </span>
            <span>
              <span>Створено:</span>{ creationDate() }
            </span>
          </Card.Footer>
        </Card>
      </div>
      <ProjectTransactions transactions={transactions}/>
      <style jsx>
        {
          `
          .container {
            max-width: 85%;
            width: 900px;
            display: flex;
            flex-wrap: wrap;
            margin: 30px auto;
            background-color: ${colors.white};
            padding: 30px;
          }
        
          .form-title {
             margin-bottom: 30px;
          }
        
          .text-green {
            color: ${colors.green}
          }
         `
        }
      </style>
    </Page>
  );
};


AdminViewProjectPage.getInitialProps = async function getInitialProps(props) {
  const { query } = props;

  const prefix = process.browser ? 'https://cors-anywhere.herokuapp.com/' : ''; // TODO: Remove when CORS will be fixed

  const projectRes = await fetch(`${prefix}https://back.donate.2.shpp.me/api/v1/projects/list`);
  const projectData = await projectRes.json();
  const project = projectData.projects.find((item) => item._id === query.id);

  const transactionsURL = `${prefix}https://back.donate.2.shpp.me/api/v1/transactions/list?project_id=${query.id}`; // TODO: Remove when CORS will be fixed
  const transactionsRes = await fetch(transactionsURL, {
    headers: {
      'Authorization': `Basic ${process.env.AUTH_TOKEN}`
    },
  });
  const data = await transactionsRes.json();

  return {
    project,
    transactions: data.transactions,
  };
};

export default AdminViewProjectPage;
