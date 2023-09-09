import React from 'react';
import withAuth from '../../components/layout/admin/HOC/withAuth';

const HomePage = () => <div />;

export const runtime = process.env.RUNTIME;

export default withAuth(HomePage);
