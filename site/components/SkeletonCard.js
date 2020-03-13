import React from 'react';
import Skeleton from 'react-loading-skeleton';

const styles = {
  wrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    display: 'flex'
  },
  infoWrapper: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    fontSize: '14px',
  },
  projectTitle: {
    margin: '5px 0'
  },
  description: {
    flexGrow: 1,
  },
  p: {
    margin: '0.5rem 0',
  },
  buttonWrapper: {
    margin: '20px 0'
  }
};

export default function SkeletonCard() {
  return (
    <div style={styles.wrapper}>
      <Skeleton height={150} />
      <div style={styles.infoWrapper}>
        <h3 style={styles.projectTitle}>
          <Skeleton count={1} />
        </h3>
        <div style={styles.description}>
          <p style={styles.p}><Skeleton count={3} /></p>
          <Skeleton width={100} />
        </div>
        <div style={styles.buttonWrapper}>
          <Skeleton height={30} />
        </div>
        <Skeleton height={5} />
        <Skeleton width={100} />
      </div>
    </div>
  );
}
