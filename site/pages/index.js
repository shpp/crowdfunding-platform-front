import React, { Component } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';

import api from '../api';
import Page from '../components/layout/Page';
import CardProject from '../components/CardProject';
import CardSkeleton from '../components/CardSkeleton';
import { grow, p } from '../utils/theme';
import { withTranslation, Link } from '../utils/translations';
import ProgressBar from '../components/ProgressBar';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial state
      projects: [],
      currency: {
        ccy: 'UAH',
        buy: 1
      },
      loading: true
    };
  }

  static getInitialProps() {
    return {
      namespacesRequired: ['help', 'common', 'header', 'footer'],
    };
  }

  async componentDidMount() {
    api.get('projects')
      .then(({ projects }) => this.setState({ projects, loading: false }));
    axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then(({ data }) => this.setState({
        currency: data.find(({ ccy }) => ccy.toUpperCase() === 'USD')
      }));
  }

  getSortedProjects(projects = []) {
    const { filter } = this.props.router.query;
    const completedProjects = projects.filter((project) => project.completed);
    const notCompletedProjects = projects.filter((project) => !project.completed);

    return filter === 'completed'
      ? completedProjects
      : [...notCompletedProjects, ...completedProjects]
        .filter(({ state }) => state === 'published')
        .sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
  }

  render() {
    const projects = this.getSortedProjects(this.state.projects);
    const { loading, currency } = this.state;
    const { t, i18n } = this.props;
    const livelihood = this.state.projects.find(({ slug }) => slug === 'shpp-kowo') || {};
    const selectedCurrency = i18n.language === 'en' ? currency : { ccy: 'UAH', buy: 1 };
    return (
      <Page>
        <div className="homepage">
          {
            this.props.router.query.filter === 'completed'
              ? null
              : (
                <div className="item">
                  <div className="card" style={{ padding: '20px' }}>
                    <Link href="/help">
                      <h3 className="project-title">
                        <a>{t('supportCard.title')}</a>
                      </h3>
                    </Link>
                    {t('supportCard.p', { returnObjects: true })
                      .map((par) => (
                        <p dangerouslySetInnerHTML={{ __html: par }} key={par} style={p} />
                      ))}
                    <p style={p}><Link href="/help"><a>{t('details')}</a></Link></p>
                    <div style={grow} />
                    <div className="button-wrapper">
                      <Link href="/help">
                        <a>
                          <button className="submit-button" type="button">
                            {t('support')}
                          </button>
                        </a>
                      </Link>
                    </div>
                    {livelihood
                      ? (
                        <>
                          <ProgressBar
                            amount={livelihood.amount}
                            funded={livelihood.this_month_funded}
                            currency={selectedCurrency}
                          />
                          <div className="text-small">
                            {t('supportCard.small')}
                          </div>
                        </>
                      ) : null}

                  </div>
                </div>
              )
          }
          {/* eslint-disable-next-line no-nested-ternary */}
          {projects.length
            ? projects
              .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
              .map((project) => (
                <div key={project.id} className="card item">
                  <CardProject project={project} currency={selectedCurrency} />
                </div>
              ))
            : loading
              ? [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card item">
                  <CardSkeleton />
                </div>
              ))
              : t('noresults')}
        </div>
      </Page>
    );
  }
}

export default withRouter(withTranslation('common')(HomePage));
