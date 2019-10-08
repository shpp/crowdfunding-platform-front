const styles = {
  wrapper: {
  },
  progressBar: {
    backgroundImage: 'linear-gradient(to right, #4e53bd 0%, #17aeb6 30%, #27ae60 100%)',
    width: '100%',
    height: '8px',
    position: 'relative'
  },
  progressBarNotFundedPart: {
    backgroundColor: '#e1e9ee',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '90%'
  }
};

const ProgressBar = ({ amount, funded }) => {
  const notFundedPercentage = funded > amount ? 0 : 100 - ((100 * funded) / amount);
  return (
    <div style={styles.wrapper}>
      <div style={styles.progressBar}>
        <div style={{...styles.progressBarNotFundedPart, width: `${notFundedPercentage}%`}}>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
