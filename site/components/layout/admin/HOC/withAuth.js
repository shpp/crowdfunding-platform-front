import { withRouter } from 'next/router';
import React, { Component } from 'react';
import { getAuthToken } from '../../../../utils/authToken';

/**
 * HOC to wrap admin pages with auth component
 */
export default function WithAuth(WrappedComponent) {
  class ProtectedComponent extends Component {
    static async getInitialProps(ctx) {
      return (WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx)) || {};
    }

    async componentDidMount() {
      const logged = getAuthToken();
      const { pathname, push } = this.props.router;
      if (!logged) {
        await push('/admin/login');
      } else if (pathname === '/admin') {
        await push('/admin/projects');
      }
    }

    render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...this.props} />;
    }
  }
  return withRouter(ProtectedComponent);
}
