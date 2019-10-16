import colors from '../theme/colors';

const styles = {
  wrapper: {
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
  const notFundedPercentage = funded > amount ? 0 : 100 - ((100 * funded) / amount);
  return (
    <div style={styles.wrapper}>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressBarNotFundedPart, width: `${notFundedPercentage}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
