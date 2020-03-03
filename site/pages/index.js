import React, { Component } from 'react';
import { withRouter } from 'next/router';
import api from '../api';
import Page from '../layout/Page';
import ProjectCard from '../components/ProjectCard';

const styles = {
  container: {
    maxWidth: '85%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '30px 0 0 0',
  },
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initial state
      projects: []
    };
  }

  async componentDidMount() {
    const { projects } = await api.get('projects');
    this.setState({ projects });
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

    return (
      <Page>
        <div style={styles.container} className="homepage">
          {projects.length
            ? projects
              .sort((a, b) => b.createdAtTS - a.createdAtTS)
              // .sort((a, b) => a.completed - b.completed)
              .map((project) => (
                <ProjectCard
                  project={project}
                  key={project._id}
                />
              ))
            : 'Тут поки що нічого немає :('}
        </div>
        <style jsx>
          {`
          main {
            min-height: 400px;
          }
          @media screen and (max-width: 1240px){
            .homepage {
              max-width: initial !important;
              width: 100% !important;
              padding: 30px 30px 0 !important;
            }
          }
            
          @media screen and (max-width: 768px){
            .homepage {
              padding: 20px 20px 0!important;
              justify-content: center;
            }
          }
        `}
        </style>
      </Page>
    );
  }
}

export default withRouter(HomePage);
