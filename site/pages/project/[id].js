import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/dist/next-server/lib/head';
import { NextSeo } from 'next-seo';

import axios from 'axios';
import api from '../../api';

import Page from '../../components/layout/Page';
import ProgressBar from '../../components/ProgressBar';
import ButtonDonate from '../../components/ButtonDonate';

import { withTranslation, i18n } from '../../utils/translations';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {
        ccy: 'UAH',
        buy: 1
      },
    };
  }

  static async getInitialProps({ query: { id } }) {
    const { projects = [] } = await api.get('projects');
    return {
      project: projects.find((item) => item._id === id),
      namespacesRequired: ['common']
    };
  }

  componentDidMount() {
    axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then(({ data }) => this.setState({
        currency: data.find(({ ccy }) => ccy.toUpperCase() === 'USD')
      }));
  }

  render() {
    const { project, router, t } = this.props;
    const { currency } = this.state;
    const selectedCurrency = i18n.language === 'en' ? currency : { ccy: 'UAH', buy: 1 };
    const lang = i18n.language || 'uk';
    const projectURL = process.env.APP_URL + router.asPath;
    if (project) {
      if (i18n.language) {
        // TODO: render NEXT SEO here with translations
        return (
          <Page>
            <NextSeo
              title={`${project[`name_${lang}`]} | Збір коштів`}
              description={project[`short_description_${lang}`]}
              canonical={projectURL}
              openGraph={{
                url: projectURL,
                title: `${project[`name_${lang}`]} | Збір коштів`,
                description: project[`short_description_${lang}`],
                images: [
                  { url: `${process.env.APP_URL}/api/getImage?url=${encodeURI(project.image)}` },
                  { url: `${process.env.APP_URL}/cover-image.png` }
                ],
                site_name: 'Підтримай++ - спільнокошт',
              }}
            />
            <Head>
              <title>{project[`name_${lang}`]} | Ш++ збір коштів</title>
            </Head>
            <div className="project-image-wrapper" style={{ backgroundImage: `url(${project.image})` }} />
            <div className="container project-info big">
              <div>
                <h1>{project[`name_${lang}`]}&nbsp;</h1>
                <span className="text-green">{project.completed ? `(${t('funded')})` : ''}</span>
                <span className="creation-date">{new Date(+project.created_at).toLocaleDateString(lang)}</span>
              </div>
              <section>
                <div dangerouslySetInnerHTML={{ __html: project[`description_${lang}`] }} key={lang} />
              </section>
              <section>
                <h2>{this.props.t('expenses.planned.title')}:</h2>
                <div dangerouslySetInnerHTML={{ __html: project[`planned_spendings_${lang}`] }} key={lang} />
              </section>
              <ProgressBar
                amount={project.amount}
                funded={project.amount_funded}
                currency={selectedCurrency}
              />
              {project.completed && project[`actual_spendings_${lang}`] && (
                <section>
                  <h2>{this.props.t('expenses.actual.title')}:</h2>
                  <div dangerouslySetInnerHTML={{ __html: project[`actual_spendings_${lang}`] }} key={lang} />
                </section>
              )}
              {!project.completed && (<ButtonDonate project_id={project._id} />)}
            </div>
          </Page>
        );
      }
      return (
        <Page>
          <NextSeo
            title={`${project[`name_${lang}`]} | Збір коштів`}
            description={project[`short_description_${lang}`]}
            canonical={projectURL}
            openGraph={{
              url: projectURL,
              title: `${project[`name_${lang}`]} | Збір коштів`,
              description: project[`short_description_${lang}`],
              images: [
                { url: `${process.env.APP_URL}/api/getImage?url=${encodeURI(project.image)}` },
                { url: `${process.env.APP_URL}/cover-image.png` }
              ],
              site_name: 'Підтримай++ - спільнокошт',
            }}
          />
        </Page>
      );
    }
    return '';
  }
}

export default withRouter(withTranslation('common')(ProjectPage));
