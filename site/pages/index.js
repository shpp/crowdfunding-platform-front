import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import api from '../api';
import Page from '../layout/Page';
import CardProject from '../components/CardProject';
import CardSkeleton from '../components/CardSkeleton';
import { grow, p } from '../theme/utils';

const styles = {
  container: {
    maxWidth: '1024px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '30px 0 0 0',
  }
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial state
      projects: [],
      loading: true
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
      .sort((a, b) => a.createdAtTS - b.createdAtTS);
  }

  render() {
    const projects = this.getSortedProjects(this.state.projects);
    const { loading } = this.state;
    return (
      <Page>
        <div style={styles.container} className="homepage">
          <div className="item">
            <div className="card" style={{ padding: '20px' }}>
              <h3>Підтримати Ш++/KOWO</h3>
              <p style={p}>
                Ш++ та КОВО &mdash; незалежні, некомерційні проекти, які щомісяця потребують коштів на утримання: оренда
                та комунальні платежі, зарплати адміністраторів, дрібний ремонт, чай, печиво, техніка.
              </p>
              <p style={p}>Зі щомісячних витрат у <strong>80 000 гривень</strong> половина вже
                покривається внесками людей/компаній, які повірили в нас.
              </p>
              <p style={p}>Допоможіть нам пришвидшити ріст &mdash; підпишіться на невеликі донати щомісяця!</p>
              <div style={grow} />
              <div className="button-wrapper">
                <Link href="/help">
                  <a>
                    <button className="submit-button" type="button">
                      Підтримати
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line no-nested-ternary */}
          {projects.length
            ? projects
              .sort((a, b) => b.createdAtTS - a.createdAtTS)
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
              : 'Тут поки що нічого немає :('}
        </div>
      </Page>
    );
  }
}

export default withRouter(HomePage);
