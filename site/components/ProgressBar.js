import React from 'react';
import { colors } from '../utils/theme';

const styles = {
  wrapper: {
    margin: '10px 0'
  },
  text: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  progressBar: {
    backgroundImage:
      `linear-gradient(to right, ${colors.progressGradientStart} 0%, ${colors.progressGradientMiddle} 30%, ${colors.progressGradientEnd} 100%)`,
    width: '100%',
    height: '5px',
    position: 'relative',
    marginTop: '4px'
  },
  progressBarNotFundedPart: {
    backgroundColor: colors.progressGradientEmpty,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '90%',
  }
};

const ProgressBar = ({ amount, funded = 0, currency }) => {
  // eslint-disable-next-line no-bitwise
  const fundedPercentage = ~~((100 * funded) / amount);
  const notFundedPercentage = Math.max(0, 100 - fundedPercentage);
  if (!amount) return '';
  return (
    <div style={styles.wrapper}>
      <div style={styles.text}>
        <span>
          <strong className="text-green">{(funded / currency.buy).toFixed(0)}&nbsp;</strong>
          <span className="text-small">{currency.ccy}</span>
        </span>
        <strong className="text-small">
          {fundedPercentage}%
        </strong>
      </div>
      <div style={styles.progressBar}>
        <div
          className="progress-not-funded"
          style={{ ...styles.progressBarNotFundedPart, width: `${notFundedPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
