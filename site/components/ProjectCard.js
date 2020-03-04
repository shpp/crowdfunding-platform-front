import React from 'react';
import Link from 'next/link';
import api from '../api';
import ProgressBar from './ProgressBar';
import colors from '../theme/colors';

const styles = {
  wrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    display: 'flex'
  },
  infoWrapper: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    fontSize: '14px',
    color: '#646464',
  },
  description: {
    // TODO: don't forget about this
    // margin: '10px 0 15px',
    flexGrow: 1,
  },
};

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
    this.state = {
      button: '',
    };
  }

  async componentDidMount() {
    const { project } = this.props;
    const { button } = await api.get('button', { id: project._id }) || '';
    this.setState({
      button: button.replace(/\\/g, ''),
    });
  }

  onSubmitClick = () => {
    const form = this.submitRef.current.getElementsByTagName('form')[0];
    if (form) {
      form.setAttribute('target', '_blank');
      form.submit();
    }
  };

  render() {
    const { project } = this.props;
    const { button } = this.state;
    return (
      <div style={styles.wrapper}>
        {project.completed && <div className="project-completed" /> }
        <Link href="/project/[id]" as={`/project/${project._id}`}>
          <img
            src={project.image}
            alt="placeholder"
            className="project-image"
          />
        </Link>
        <div style={styles.infoWrapper}>
          <Link href="/project/[id]" as={`/project/${project._id}`}>
            <h3 className="project-title">
              {project.name}
            </h3>
          </Link>
          <div
            style={styles.description}
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
          {!project.completed && (
            <div className="button-wrapper" ref={this.submitRef}>
              <button
                className="submit-button"
                type="button"
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

          <ProgressBar
            amount={project.amount}
            funded={project.amountFunded}
          />

          <div className="text-small">
            {new Date(+project.createdAtTS || 0).toLocaleDateString('uk')}
          </div>
        </div>
        <style jsx>
          {
            `
            .project-completed:before {
              letter-spacing: 1px;
              position: absolute;
              content: 'профінансовано';
              width: 150px;
              top: 19px;
              left: -29px;
              transform: rotate(-31deg);
              height: 20px;
              line-height: 20px;
              background: #23ff29b3;
              color: #ffffff;
              font-size: 10px;
              text-align: center;
              }
            
            .project-image {
              height: 150px;
              object-fit: cover;
              margin: 0;
              width: 100%;
              cursor: pointer;
            }
            
            .project-title {
              margin: 5px 0;
              font-size: 16px;
              cursor: pointer;
              color: #282828;
            }
            
            .button-wrapper {
              text-align: center;
            }
            .submit-button {
              background-color: ${colors.green};
              color: ${colors.white};
              border: none;
              padding: 10px 15px;
              font-size: 14px;
              display: inline-block;
              cursor: pointer;
            }
            h3:hover{
              color: ${colors.green};
            }
            p {
              margin: 0.5rem 0;
            }
            `
          }
        </style>
      </div>
    );
  }
}

export default ProjectCard;