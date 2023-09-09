import React from 'react';
import withAuth from '../../components/layout/admin/HOC/withAuth';

const HomePage = () => <div />;

export const runtime = 'edge';

export default withAuth(HomePage);
