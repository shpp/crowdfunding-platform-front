import React from 'react';
// import Link from 'next/link';
import ProgressBar from './ProgressBar';
import Check from '../assets/icon/check.svg';
import { formatDate } from '../utils';
import ButtonDonate from './ButtonDonate';
import { flex, column, p, grow } from '../utils/theme';
import { withTranslation, i18n, Link } from '../utils/translations';

class CardProject extends React.Component {
  render() {
    const { project, t } = this.props;
    return (
      <div style={{ ...flex, ...column, ...grow }}>
        {project.completed && <div className="project-completed"><Check style={{ verticalAlign: 'bottom' }} /> &nbsp;{t('completed')}</div> }
        <Link
          href={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/[id]`}
          as={`/project/${project._id}`}
        >
          <img
            src={project.image}
            alt="placeholder"
            className="project-image"
          />
        </Link>
        <div className="project-info">
          <Link
            href={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/[id]`}
            as={`/project/${project._id}`}
          >
            <h3 className="project-title">
              <a>{project[`name_${i18n.language}`]}</a>
            </h3>
          </Link>
          <div style={grow}>
            <p style={p}>{project[`short_description_${i18n.language}`]}</p>
            <p style={p}>
              <Link
                href={`${i18n.language === 'uk' ? '' : `/${i18n.language}`}/project/[id]`}
                as={`/project/${project._id}`}
              >
                <a>{t('details')}</a>
              </Link>
            </p>
          </div>
          {!project.completed && (<ButtonDonate project_id={project._id} />)}

          <ProgressBar
            amount={project.amount}
            funded={project.amount_funded}
          />

          <div className="text-small">
            {t('createdAt')} {formatDate(+project.created_at, i18n.language)}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(CardProject);
