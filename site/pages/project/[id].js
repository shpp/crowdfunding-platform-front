import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/dist/next-server/lib/head';
import { NextSeo } from 'next-seo';

import api from '../../api';

import Page from '../../layout/Page';
import ProgressBar from '../../components/ProgressBar';
import ButtonDonate from '../../components/ButtonDonate';

import { withTranslation, i18n } from '../../utils/translations';

import '../../assets/styles/project.css';

class ProjectPage extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const { projects = [] } = await api.get('projects');
    return {
      project: projects.find((item) => item._id === id),
      namespacesRequired: ['common']
    };
  }

  render() {
    const { project, router, t } = this.props;
    const projectURL = process.env.APP_URL + router.asPath;
    if (project) {
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
          <div className="project-image-wrapper" style={{ backgroundImage: `url(${project.image})` }} />
          <div className="container">
            <div>
              <h2>{project.name}&nbsp;</h2>
              <span className="text-green">{project.completed ? `(${t('funded')})` : ''}</span>
              <span className="creation-date">{new Date(+project.createdAtTS).toLocaleDateString(i18n.language)}</span>
            </div>

            <section>
              <div dangerouslySetInnerHTML={{ __html: project.description }} />
            </section>
            <section>
              <p><strong>{this.props.t('expenses.actual.title')}:</strong></p>
              <div dangerouslySetInnerHTML={{ __html: project.plannedSpendings }} />
            </section>
            <ProgressBar
              amount={project.amount}
              funded={project.amountFunded}
            />
            {project.completed && project.actualSpendings && (
              <section>
                <p><strong>{this.props.t('expenses.actual.title')}:</strong></p>
                <div dangerouslySetInnerHTML={{ __html: project.actualSpendings }} />
              </section>
            )}
            {!project.completed && (<ButtonDonate projectId={project._id} />)}
          </div>
        </Page>
      );
    }
    return '';
  }
}

export default withRouter(withTranslation('common')(ProjectPage));
