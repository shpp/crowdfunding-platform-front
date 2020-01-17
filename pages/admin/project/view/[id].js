
import Link from 'next/link';
import { Card, Container, Row } from 'react-bootstrap';
import Page from '../../../../layout/admin/Page';
import colors from '../../../../theme/colors';
import ProgressBar from '../../../../components/ProgressBar';
import ProjectTransactions from '../../../../components/ProjectTransactions';
import withAuth from '../../../../layout/admin/HOC/withAuth';
import { PROJECTS_LIST, TRANSACTIONS_LIST } from '../../../../utils/api_urls';
import { fetchDataGet } from '../../../../utils/fetchData';


const AdminViewProjectPage = (props) => {
  const { project, transactions } = props;

  const creationDate = () => {
    const event = new Date(project.creationTime);
    return `${event.getDate()}.${event.getMonth()}.${event.getFullYear()}`;
  };

  return (
    <Page>
      <Container className="container-fluid my-5">
        <Card className="text-center">
          <Card.Header className="d-flex justify-content-between">
            <h1 className="form-title">{project.name}</h1>
            <Link
              href={{ pathname: '/admin/project/edit/[id]', query: project }}
              as={`/admin/project/edit/${project._id}`}
            >
              <a>Редагувати</a>
            </Link>
          </Card.Header>
          <Card.Body>
            <div className="d-flex align-content-start justify-content-between">
              <h5>
                <span className="mr-1">
                  {project.currency}
                </span>
                <span className="text-green">{project.amountFunded}</span>
                <span className="text-muted">
                  <span>/</span>
                  {project.amount}
                </span>
              </h5>
              <h5>
                <span className="text-success">{project.published ? 'Опубліковано' : 'Приховано' }</span>
              </h5>
            </div>
            <div className="col-md-10 my-3 mx-auto">
              <ProgressBar amount={project.amount} funded={project.amountFunded} />
            </div>
            <Card.Title>{project.plannedSpendings}</Card.Title>
            <Card.Text>{project.description}</Card.Text>
            <ProjectTransactions
              transactions={transactions}
              project_id={project._id}
            />
          </Card.Body>
          <Card.Footer>
            <Row className="text-muted d-flex justify-content-between">
              <span>
                <span>id:</span>
                { project._id }
              </span>
              <span>
                <span>Створено:</span>
                { creationDate() }
              </span>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
      <style jsx>
        {
          `                
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

  const projectRes = await fetchDataGet(`${PROJECTS_LIST}`);
  const project = projectRes.projects.find((item) => item._id === query.id);

  const transactionsURL = `${TRANSACTIONS_LIST}${query.id}`;
  const transactionsRes = await fetchDataGet(transactionsURL);

  return {
    project,
    transactions: transactionsRes.transactions,
  };
};

export default withAuth(AdminViewProjectPage);
