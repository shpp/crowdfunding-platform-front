import colors from '../theme/colors';

const styles = {
  wrapper: {
    margin: '10px 15px 10px 5px'
  },
  progressBar: {
    backgroundImage:
      `linear-gradient(to right, ${colors.progressGradientStart} 0%, ${colors.progressGradientMiddle} 30%, ${colors.progressGradientEnd} 100%)`,
    width: '100%',
    height: '8px',
    position: 'relative',
  },
  progressBarNotFundedPart: {
    backgroundColor: colors.progressGradientEmpty,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '90%',
  },
};

const ProgressBar = ({ amount, funded }) => {
  // eslint-disable-next-line no-bitwise
  const fundedPercentage = ~~((100 * funded) / amount);
  const notFundedPercentage = Math.max(0, 100 - fundedPercentage);
  return (
    <div style={styles.wrapper}>
      <div style={styles.progressBar}>
        <div
          className="progress-not-funded"
          style={{ ...styles.progressBarNotFundedPart, width: `${notFundedPercentage}%` }}
        />
      </div>
      <style jsx>{`
      .progress-not-funded:before {
        position: absolute;
        top: -9px;
        left: -9px;
        
        width: 25px;
        display: inline-block;
        line-height: 25px;
        height: 25px;
        border: 1px solid #999999;
        border-radius: 50%;
        
        text-align: center;
        background-color: #f5f5f5;
        color: #888888;
        font-size: 10px;
        content: '${fundedPercentage}%';
      }
      `}
      </style>
    </div>
  );
};

export default ProgressBar;
