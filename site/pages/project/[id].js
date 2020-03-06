import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/dist/next-server/lib/head';
import { NextSeo } from 'next-seo';
import api from '../../api';
import Page from '../../layout/Page';
import colors from '../../theme/colors';
import ProgressBar from '../../components/ProgressBar';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
    this.state = {
      button: ''
    };
  }

  async componentDidMount() {
    const id = this.props.project._id;
    const { button } = await api.get('button', { id });
    this.setState({ button });
  }

  static async getInitialProps({ query: { id } }) {
    const { projects = [] } = await api.get('projects');
    return {
      project: projects.find((item) => item._id === id)
    };
  }

  onSubmitClick = () => {
    const form = this.submitRef.current.getElementsByTagName('form')[0];
    if (form) {
      form.setAttribute('target', '_blank');
      form.submit();
    }
  };

  render() {
    const { button } = this.state;
    const { project = {}, router } = this.props;
    const projectURL = process.env.APP_URL + router.asPath;

    return (
      <Page>
        <NextSeo
          title={`${project.name} | Збір коштів`}
          description={project.shortDescription}
          canonical={projectURL}
          openGraph={{
            url: projectURL,
            title: `${project.name} | Збір коштів`,
            description: project.shortDescription,
            images: [
              { url: `${process.env.APP_URL}/api/getImage?url=${encodeURI(project.image)}` }
            ],
            site_name: 'Підтримай++ - спільнокошт',
          }}
        />
        <Head>
          <title>{project.name} | Ш++ збір коштів</title>
        </Head>
        <div className="project-image-wrapper" />
        <div className="container">
          <div>
            <h2>{project.name}&nbsp;</h2>
            <span className="text-green">{project.completed ? '(профінансовано)' : ''}</span>
            <span className="creation-date">{new Date(+project.createdAtTS).toLocaleDateString('uk')}</span>
          </div>

          <section>
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </section>
          <section>
            <p><strong>Заплановані витрати:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: project.plannedSpendings }} />
          </section>
          <ProgressBar
            amount={project.amount}
            funded={project.amountFunded}
          />
          { project.completed && project.actualSpendings && (
            <section>
              <p><strong>Гроші було витрачено на:</strong></p>
              <div dangerouslySetInnerHTML={{ __html: project.actualSpendings }} />
            </section>
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
                onKeyPress={() => {}}
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
          .creation-date {
            color: grey;
            font-size: 12px;
            position: absolute;
            right: 20px;
            top: 20px;
          }
          .project-image-wrapper {
            width: 100vw;
            margin: -51px;
            height: 400px;
            overflow: hidden;
            margin-bottom: 0;
            background-size: cover;
            background-position: center center;
            background-image: url(${project.image});
          }
          
          .button-wrapper {
            padding: 25px 0 15px;
            text-align: center;
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

          @media screen and (max-width: 464px) {
            .project-image-wrapper {
              margin: -20px;
              height: 150px;
            }
          }
        `}
        </style>
      </Page>
    );
  }
}

export default withRouter(ProjectPage);
