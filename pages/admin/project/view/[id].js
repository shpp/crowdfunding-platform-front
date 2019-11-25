import Page from '../../../../layout/admin/Page';
import colors from '../../../../theme/colors';

const AdminViewProjectPage = (props) => {
  const { project } = props;
  return (
    <Page>
      <div className="container">
        <h1 className="form-title">
          {project.name}
        </h1>
      </div>
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

  return {
    project,
  };
};

export default AdminViewProjectPage;
