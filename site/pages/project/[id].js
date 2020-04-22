import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/dist/next-server/lib/head';
import { NextSeo } from 'next-seo';

import api from '../../api';

import Page from '../../components/layout/Page';
import ProgressBar from '../../components/ProgressBar';
import ButtonDonate from '../../components/ButtonDonate';

import { withTranslation, i18n } from '../../utils/translations';

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
    const lang = i18n.language || 'uk';
    const projectURL = process.env.APP_URL + router.asPath;
    if (project) {
      return (
        <Page>
          <NextSeo
            title={`${project[`name_${lang}`]} | Збір коштів`}
            description={project[`short_description_${lang}`]}
            canonical={projectURL}
            openGraph={{
              url: projectURL,
              title: `${project[`name_${lang}`]} | Збір коштів`,
              description: project.short_description,
              images: [
                { url: `${process.env.APP_URL}/api/getImage?url=${encodeURI(project.image)}` }
              ],
              site_name: 'Підтримай++ - спільнокошт',
            }}
          />
          <Head>
            <title>{project[`name_${lang}`]} | Ш++ збір коштів</title>
          </Head>
          <div className="project-image-wrapper" style={{ backgroundImage: `url(${project.image})` }} />
          <div className="container">
            <div>
              <h2>{project[`name_${lang}`]}&nbsp;</h2>
              <span className="text-green">{project.completed ? `(${t('funded')})` : ''}</span>
              <span className="creation-date">{new Date(+project.created_at).toLocaleDateString(lang)}</span>
            </div>

            <section>
              <div dangerouslySetInnerHTML={{ __html: project[`description_${lang}`] }} />
            </section>
            <section>
              <p><strong>{this.props.t('expenses.planned.title')}:</strong></p>
              <div dangerouslySetInnerHTML={{ __html: project[`planned_spendings_${lang}`] }} />
            </section>
            <ProgressBar
              amount={project.amount}
              funded={project.amount_funded}
            />
            {project.completed && project.actual_spendings && (
              <section>
                <p><strong>{this.props.t('expenses.actual.title')}:</strong></p>
                <div dangerouslySetInnerHTML={{ __html: project[`actual_spendings_${lang}`] }} />
              </section>
            )}
            {!project.completed && (<ButtonDonate project_id={project._id} />)}
          </div>
        </Page>
      );
    }
    return '';
  }
}

export default withRouter(withTranslation('common')(ProjectPage));
