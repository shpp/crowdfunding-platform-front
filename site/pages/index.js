import React, { Component } from 'react';
import { withRouter } from 'next/router';
import api from '../api';
import Page from '../components/layout/Page';
import CardProject from '../components/CardProject';
import CardSkeleton from '../components/CardSkeleton';
import { grow, p } from '../utils/theme';
import { withTranslation, Link } from '../utils/translations';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial state
      projects: [],
      loading: true
    };
  }

  static getInitialProps() {
    return {
      namespacesRequired: ['help', 'common', 'header', 'footer'],
    };
  }

  async componentDidMount() {
    const { projects } = await api.get('projects');
    this.setState({ projects, loading: false });
  }

  getSortedProjects(projects = []) {
    const { filter } = this.props.router.query;
    const completedProjects = projects.filter((project) => project.completed);
    const notCompletedProjects = projects.filter((project) => !project.completed);

    return (filter === 'completed'
      ? completedProjects
      : [...notCompletedProjects, ...completedProjects])
      .sort((a, b) => a.created_at - b.created_at);
  }

  render() {
    const projects = this.getSortedProjects(this.state.projects);
    const { loading } = this.state;
    const { t } = this.props;
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
                  </div>
                </div>
              )
          }
          {/* eslint-disable-next-line no-nested-ternary */}
          {projects.length
            ? projects
              .sort((a, b) => b.created_at - a.created_at)
              .map((project) => (
                <div key={project._id} className="card item">
                  <CardProject project={project} />
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
