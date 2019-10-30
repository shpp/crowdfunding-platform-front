import fetch from 'isomorphic-unfetch';
import React from 'react';
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
  image: {
    height: '150px',
    objectFit: 'cover',
    margin: '0 0 10px',
  },
  projectTitle: {
    margin: '5px 0',
  },
  description: {
    margin: '10px 0 15px',
    flexGrow: 1,
  },
  fundedText: {
    marginBottom: '5px',
    display: 'inline-block',
  },
  buttonWrapper: {
    padding: '25px 0 15px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.green,
    color: colors.white,
    border: 'none',
    padding: '10px 25px',
    fontSize: '20px',
    display: 'inline-block',
    cursor: 'pointer',
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
      form.submit();
    }
  }

  render() {
    const { project } = this.props;
    const { button } = this.state;
    return (
      <div style={styles.wrapper} className="card">
        <img src={project.image || placeholderData.imagePlaceholder} alt="placeholder" style={styles.image} />
        <div style={styles.infoWrapper}>
          <h3 style={styles.projectTitle}>
            {project.name}
          </h3>
          <p style={styles.description}>
            {project.description}
          </p>
          {!project.completed && (
            <div>
              <span style={styles.fundedText}>
                {`Вже зібрали: ${project.amountFunded} грн (з ${project.amount} грн)`}
              </span>
              <ProgressBar
                amount={project.amount}
                funded={project.amountFunded}
              />
            </div>
          )}
          {!project.completed && (
            <div style={styles.buttonWrapper} ref={this.submitRef}>
              <button
                style={styles.button}
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
            
            .liqpay-form {
              display: none;
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
