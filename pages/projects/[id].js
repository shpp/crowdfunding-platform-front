import React from 'react';
import Page from '../../layout/Page';
import colors from '../../theme/colors';
import placeholderData from '../../mock/placeholderData';
import ProgressBar from '../../components/ProgressBar';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
  }

  onSubmitClick = () => {
    const form = this.submitRef.current.getElementsByTagName('form')[0];
    if (form) {
      form.setAttribute('target', '_blank');
      form.submit();
    }
  };

  render() {
    const { project, button } = this.props;
    return (
      <Page>
        <div className="project-container">
          <h1>
            {project.name}
          </h1>
          <div>
            <img
              src={project.image || placeholderData.imagePlaceholder}
              alt="placeholder"
              className="project-image"
            />
          </div>
          <p>
            {project.description}
          </p>
          {!project.completed && (
            <div>
              <span className="funded-text">
                {`Вже зібрали: ${project.amountFunded} грн (з ${project.amount} грн)`}
              </span>
              <ProgressBar
                amount={project.amount}
                funded={project.amountFunded}
              />
            </div>
          )}
          {!project.completed && (
            <div
              className="button-wrapper"
              ref={this.submitRef}
            >
              <button
                type="button"
                className="submit-button"
                onClick={this.onSubmitClick}
                onKeyPress={() => {
                }}
              >
                Підтримати
              </button>
              <div
                dangerouslySetInnerHTML={{ __html: button }}
                className="liqpay-form"
              />
            </div>
          )}
        </div>
        <style jsx>
          {`
          .project-container {
            max-width: 85%;
            margin: 30px auto;
            padding: 5px 20px;
            background-color: ${colors.white};
          }
          
          .project-image {
            max-width: 100%;
            object-fit: cover;
            margin: 0 auto 10px;
          }
          
          .button-wrapper {
            padding: 25px 0 15px;
            text-align: center;
          }
          
          .funded-text {
            margin-bottom: 5px;
            display: inline-block;
          }
          
          .submit-button {
            background-color: ${colors.green};
            color: ${colors.white};
            border: none;
            padding: 10px 25px;
            font-size: 20px;
            display: inline-block;
            cursor: pointer;
          }
          
          /* TODO: need to test display:none form submit in old browsers */
          .liqpay-form {
            display: none;
          }
        `}
        </style>
      </Page>
    );
  }
}

ProjectPage.getInitialProps = async function getInitialProps(props) {
  const { query } = props;
  const prefix = process.browser ? 'https://cors-anywhere.herokuapp.com/' : ''; // TODO: Remove when CORS will be fixed

  const projectRes = await fetch(`${prefix}https://back.donate.2.shpp.me/api/v1/projects/list`);
  const projectData = await projectRes.json();
  const buttonRes = await fetch(`${prefix}https://back.donate.2.shpp.me/api/v1/projects/button?id=${query.id}`);
  const buttonData = await buttonRes.json();
  const project = projectData.projects.find((item) => item._id === query.id);

  return {
    project,
    button: buttonData.button,
  };
};

export default ProjectPage;
