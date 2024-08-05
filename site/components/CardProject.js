import React from 'react';
import Check from '../assets/icon/check.svg';
import Cross from '../assets/icon/cross.svg';
import Question from '../assets/icon/question.svg';
import ProgressBar from './ProgressBar';

import { formatDate, getCloseDate } from '../utils';
import { column, flex, grow, p } from '../utils/theme';
import { i18n, Link, withTranslation } from '../utils/translations';
import ButtonDonate from './ButtonDonate';

class CardProject extends React.Component {
  render() {
    const { project, t, currency } = this.props;
    return (
      <div style={{ ...flex, ...column, ...grow }}>
        {project.completed ? (
          <div className="project-status-completed">
            <Check style={{ verticalAlign: 'bottom' }} /> &nbsp;{t('completed')}
          </div>
        ) : (
          project.expire_at < Date.now() && (
            <div className="project-status-expired">
              <Cross style={{ verticalAlign: 'bottom' }} /> &nbsp;{t('expired')}
              &nbsp;
              <Link href="/agreement#deadlines" as="/agreement#deadlines">
                <Question style={{ verticalAlign: 'sub' }} />
              </Link>
            </div>
          )
        )}
        <Link
          href={`${
            i18n.language === 'uk' ? '' : `/${i18n.language}`
          }/project/[id]`}
          as={`/project/${project.id}`}
        >
          <img src={project.image} alt="" className="project-image" />
        </Link>
        <div className="project-info">
          <Link
            href={`${
              i18n.language === 'uk' ? '' : `/${i18n.language}`
            }/project/[id]`}
            as={`/project/${project.id}`}
          >
            <h3 className="project-title">
              <a>{project[`name_${i18n.language}`]}</a>
            </h3>
          </Link>
          <div style={grow}>
            <p style={p}>{project[`short_description_${i18n.language}`]}</p>
            <p style={p}>
              <Link
                href={`${
                  i18n.language === 'uk' ? '' : `/${i18n.language}`
                }/project/[id]`}
                as={`/project/${project.id}`}
              >
                <a>{t('details')}</a>
              </Link>
            </p>
          </div>
          {!(project.completed || project.expire_at < Date.now()) && (
            <ButtonDonate project_id={project.id} />
          )}

          <ProgressBar
            amount={project.amount}
            funded={project.amount_funded}
            currency={currency}
          />
          <div className="text-small">
            {project.completed || project.expire_at < Date.now()
              ? `${t('closedAt')} ${getCloseDate(
                  project.completed
                    ? project.last_transaction_at
                    : project.expire_at,
                  i18n.language
                )}`
              : `${t('createdAt')} ${formatDate(
                  project.created_at,
                  i18n.language
                )}`}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(CardProject);
