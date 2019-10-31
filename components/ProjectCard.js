import fetch from 'isomorphic-unfetch';
import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import placeholderData from '../mock/placeholderData';
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
    margin: '10px 0 15px',
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
    const prefix = 'https://cors-anywhere.herokuapp.com/'; // TODO: Remove when CORS will be fixed
    fetch(`${prefix}https://back.donate.2.shpp.me/api/v1/projects/button?id=${project._id}`)
      .then((res) => res.json())
      .then((data) => this.setState({
        button: data.button.replace(/\\/g, ''),
      }));
  }

  onSubmitClick = () => {
    const form = this.submitRef.current.getElementsByTagName('form')[0];
    if (form) {
      form.setAttribute('target', '_blank');
      form.submit();
    }
  }

  render() {
    const { project } = this.props;
    const { button } = this.state;
    return (
      <div style={styles.wrapper} className="card">
        <Link href="/projects/[id]" as={`/projects/${project._id}`}>
          <img
            src={project.image || placeholderData.imagePlaceholder}
            alt="placeholder"
            className="project-image"
          />
        </Link>
        <div style={styles.infoWrapper}>
          <Link href="/projects/[id]" as={`/projects/${project._id}`}>
            <h3 className="project-title">
              {project.name}
            </h3>
          </Link>
          <p style={styles.description}>
            {project.description}
          </p>
          {!project.completed && (
            <div>
              <span className="funded-text">
                {`Вже зібрали: ${project.amountFunded} грн (з ${project.amount} грн)`}
              </span>
              <ProgressBar
                amount={project.amount}
                funded={project.amountFunded}
              />
            </div>
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
          {/*   {`опубліковано ${new Date(project.creationTime).toLocaleDateString("ua-UA")}`} */}
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
          
            @media screen and (max-width: 1240px){
              .card{
                margin: 0 15px 40px !important;
                width: calc(100%/2 - 30px) !important;
              }
            }   
            
            @media screen and (max-width: 768px){
              .card{
                margin: 0 0 30px !important;
                width: 100% !important;
              }
            }
            
            @media screen and (max-width: 460px){
    
            }`
          }
        </style>
      </div>
    );
  }
}

export default ProjectCard;
