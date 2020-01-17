import Router from 'next/router';

/**
 * HOC to wrap admin pages with auth component
 */
/* eslint-disable react/jsx-props-no-spreading */
export default function WithAuth(WrappedComponent) {
  const ProtectedComponent = (props) => {
    return <WrappedComponent {...props} />;
  };

  ProtectedComponent.getInitialProps = async (ctx) => {
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    const logged = true; // TODO: check localstorage if user loggedIn

    const redirect = () => {
      if (process.browser) {
        Router.push('/admin/login');
      } else {
        ctx.res.writeHead(302, { Location: '/admin/login' });
        ctx.res.end();
      }
    };

    if (!logged) {
      redirect();
    }

    return { ...componentProps };
  };

  return ProtectedComponent;
}
