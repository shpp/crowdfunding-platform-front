import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import Check from '../assets/icon/check.svg';
import { formatDate } from '../utils';
import ButtonDonate from './ButtonDonate';
import { flex, column, p, grow } from '../theme/utils';

class CardProject extends React.Component {
  render() {
    const { project } = this.props;
    return (
        {project.completed && <div className="project-completed"><Check style={{ verticalAlign: 'bottom' }} /> &nbsp;завершено</div> }
        <Link href="/project/[id]" as={`/project/${project._id}`}>
      <div style={{ ...flex, ...column, ...grow }}>
          <img
            src={project.image}
            alt="placeholder"
            className="project-image"
          />
        </Link>
          <Link href="/project/[id]" as={`/project/${project._id}`}>
        <div className="project-info">
            <h3 className="project-title">
              {project.name}
            </h3>
          </Link>
            <p>{project.shortDescription}</p>
            <p><Link href="/project/[id]" as={`/project/${project._id}`}><a>детальніше</a></Link></p>
          <div style={grow}>
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
      </div>
    );
  }
}

export default CardProject;
