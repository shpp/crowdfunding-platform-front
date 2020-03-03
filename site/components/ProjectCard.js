import React from 'react';
import Link from 'next/link';
import api from '../api';
import ProgressBar from './ProgressBar';
import colors from '../theme/colors';

const styles = {
  wrapper: {
    margin: '0 15px 50px',
    width: 'calc(100%/3 - 30px)',
    maxWidth: '540px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    transition: '0.3s',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative'
  },
  infoWrapper: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  publishedAt: {
    textAlign: 'right',
    opacity: '0.6',
  },
  description: {
    // TODO: don't forget about this
    // margin: '10px 0 15px',
    // flexGrow: 1,
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
      <div style={styles.wrapper} className="card">
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
            <section>
              <p><strong>Заплановані витрати:</strong></p>
              <div
                style={styles.description}
                dangerouslySetInnerHTML={{ __html: project.plannedSpendings }}
              />
            </section>
          )}
          <div className="funded-text">
            <strong>Зібрали: </strong>
            <span className="text-green">{project.amountFunded}</span>
            <span>/{project.amount} грн</span>
          </div>
          <ProgressBar
            amount={project.amount}
            funded={project.amountFunded}
          />
          {project.completed && project.actualSpendings && (
            <section>
              <p><strong>Гроші витрачені на:</strong></p>
              <div
                style={styles.description}
                dangerouslySetInnerHTML={{ __html: project.actualSpendings }}
              />
            </section>
          )}
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
          {/* <div style={styles.publishedAt}> */}
          {/*   {`опубліковано ${new Date(project.createdAtTS).toLocaleDateString("ua-UA")}`} */}
          {/* </div> */}
        </div>
        <style jsx>
          {
            `.card:hover{
              transform: translateY(-4px);
              box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15) !important;
            }
            .card:hover h3{
              color: ${colors.green};
            }
            
            /* TODO: need to test display:none form submit in old browsers */
            .liqpay-form {
              display: none;
            }
            
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
              margin: 0 0 10px;
              width: 100%;
              cursor: pointer;
            }
            
            .project-title {
              margin: 5px 0;
              cursor: pointer;
            }
            
            .button-wrapper {
              padding: 25px 0 15px;
              text-align: center;
            }
            
            .funded-text {
              margin-bottom: 5px;
              display: inline-block;
            }
            
            .submit-button {
              background-color: ${colors.green};
              color: ${colors.white};
              border: none;
              padding: 10px 25px;
              font-size: 20px;
              display: inline-block;
              cursor: pointer;
            }
          
            @media screen and (max-width: 1240px) {
              .card {
                margin: 0 15px 40px !important;
                width: calc(100%/2 - 30px) !important;
              }
            }   
            
            @media screen and (max-width: 768px) {
              .card {
                margin: 0 0 30px !important;
                width: 100% !important;
              }
            }
            
            @media screen and (max-width: 460px) {
              .card {
                margin: 0;
              }
            }`
          }
        </style>
      </div>
    );
  }
}

export default ProjectCard;
