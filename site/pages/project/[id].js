import { NextSeo } from 'next-seo';
import Head from 'next/dist/next-server/lib/head';
import { withRouter } from 'next/router';
import React from 'react';

import axios from 'axios';
import api from '../../api';
import Check from '../../assets/icon/check.svg';
import Cross from '../../assets/icon/cross.svg';
import Question from '../../assets/icon/question.svg';

import ButtonDonate from '../../components/ButtonDonate';
import Page from '../../components/layout/Page';
import ProgressBar from '../../components/ProgressBar';

import { formatDate } from '../../utils';
import { i18n, Link, withTranslation } from '../../utils/translations';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {
        ccy: 'UAH',
        buy: 1,
      },
    };
  }

  static async getInitialProps({ query: { id } }) {
    const { project } = await api.request(`projects/${id}`, 'get');
    return {
      project,
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    axios
      .get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then(({ data }) => this.setState({
        currency: data.find(({ ccy }) => ccy.toUpperCase() === 'USD'),
      }));
  }

  render() {
    const { project, router, t } = this.props;
    project.expire_at = Number(new Date(project.created_at)) + 1000 * 60 * 60 * 24 * 50;
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
                  {
                    url: `${process.env.APP_URL}/api/getImage?url=${encodeURI(
                      project.image
                    )}`,
                  },
                  { url: `${process.env.APP_URL}/cover-image.jpg` },
                ],
                site_name: 'Підтримай++ - спільнокошт',
              }}
            />
            <Head>
              <title>{project[`name_${lang}`]} | Ш++ збір коштів</title>
            </Head>
            <div
              className="project-image-wrapper"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="container project-info big">
              {project.completed ? (
                <div className="project-status-completed">
                  <Check style={{ verticalAlign: 'bottom' }} /> &nbsp;
                  {t('completed')}
                </div>
              ) : (
                project.expire_at
                && project.expire_at < Date.now() && (
                  <div className="project-status-expired">
                    <Cross style={{ verticalAlign: 'bottom' }} /> &nbsp;
                    {t('expired')}&nbsp;
                    <Link href="/agreement#deadlines" as="/agreement#deadlines">
                      <Question style={{ verticalAlign: 'sub' }} />
                    </Link>
                  </div>
                )
              )}
              <div>
                <h1>{project[`name_${lang}`]}&nbsp;</h1>
                <span className="creation-date">
                  {formatDate(project.created_at)} &mdash;{' '}
                  {formatDate(
                    project.completed
                      ? project.last_transaction_at
                      : project.expire_at,
                    lang
                  )}
                </span>
              </div>
              <section>
                <div
                  dangerouslySetInnerHTML={{
                    __html: project[`description_${lang}`],
                  }}
                  key={lang}
                />
              </section>
              <ProgressBar
                amount={project.amount}
                funded={project.amount_funded}
                currency={selectedCurrency}
              />
              {project.completed
                && project[`actual_spendings_${lang}`]
                && project[`actual_spendings_${lang}`].length && (
                  <section>
                    <h2>{this.props.t('expenses.actual.title')}:</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: project[`actual_spendings_${lang}`],
                      }}
                      key={lang}
                    />
                  </section>
              )}
              {!(project.completed || project.expired) && (
                <ButtonDonate project_id={project.id} />
              )}
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
                {
                  url: `${process.env.APP_URL}/api/getImage?url=${encodeURI(
                    project.image
                  )}`,
                },
                { url: `${process.env.APP_URL}/cover-image.jpg` },
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
