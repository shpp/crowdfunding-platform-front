import React, { Component } from 'react';
import { withRouter } from 'next/router';
import api from '../api';
import Page from '../layout/Page';
import ProjectCard from '../components/ProjectCard';
import colors from '../theme/colors';

const styles = {
  container: {
    maxWidth: '85%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '30px 0 0 0',
  },
  cardWrapper: {
    margin: '0 15px 50px',
    width: 'calc(100%/3 - 30px)',
    maxWidth: '540px',
    display: 'flex',
    backgroundColor: colors.white,
    transition: '0.3s',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative'
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
                <div
                  key={project._id}
                  style={styles.cardWrapper}
                  className="card"
                >
                  <ProjectCard project={project} />
                </div>
              ))
            : 'Тут поки що нічого немає :('}
        </div>
        <style jsx>
          {`
          main {
            min-height: 400px;
          }
          .card:hover{
            transform: translateY(-4px);
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15) !important;
          }

          @media screen and (max-width: 1240px){
            .homepage {
              max-width: initial !important;
              width: 100% !important;
              padding: 30px 30px 0 !important;
            }
            .card {
              margin: 0 15px 40px !important;
              width: calc(100%/2 - 30px) !important;
            }
          }
            
          @media screen and (max-width: 768px){
            .homepage {
              padding: 20px 20px 0!important;
              justify-content: center;
            }
            .card {
              margin: 0 0 30px !important;
              width: 100% !important;
            }
          }
          @media screen and (max-width: 460px) {
            .homepage {
              padding: 0!important;
            }
            .card {
              margin: 0;
            }
          }
        `}
        </style>
      </Page>
    );
  }
}

export default withRouter(HomePage);
