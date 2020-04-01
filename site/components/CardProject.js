import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import colors from '../theme/colors';
import Check from '../assets/icon/check.svg';
import { formatDate } from '../utils';
import ButtonDonate from './ButtonDonate';
import { flex, column } from '../theme/utils';

const styles = {
  wrapper: {
    flexGrow: 1,
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
  }
};

class CardProject extends React.Component {
  render() {
    const { project } = this.props;
    return (
      <div style={{ ...flex, ...column, ...styles.wrapper }}>
        {project.completed && <div className="project-completed"><Check style={{ verticalAlign: 'bottom' }} /> &nbsp;завершено</div> }
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
          <div style={styles.description}>
            <p>{project.shortDescription}</p>
            <p><Link href="/project/[id]" as={`/project/${project._id}`}><a>детальніше</a></Link></p>
          </div>
          {!project.completed && (<ButtonDonate projectId={project._id} />)}

          <ProgressBar
            amount={project.amount}
            funded={project.amountFunded}
          />

          <div className="text-small">
            Створено {formatDate(+project.createdAtTS)}
          </div>
        </div>
        <style jsx>
          {
            `
            .project-completed {
              letter-spacing: 1px;
              position: absolute;
              
              padding: 7px 15px;
              text-transform: uppercase;
              top: 10px;
              left: 10px;
              
              line-height: 20px;
              background: rgb(229, 247, 233);
              color: ${colors.green};
              font-size: 10px;
              font-weight: bold;
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

export default CardProject;
