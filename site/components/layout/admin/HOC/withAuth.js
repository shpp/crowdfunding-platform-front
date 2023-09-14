import { useRouter, withRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * HOC to wrap admin pages with auth component
*/
const WithAuth = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const logged = sessionStorage.getItem('token');
      if (!logged) {
        router.push('/admin/login');
      } else if (router.pathname === '/admin') {
        router.push('/admin/projects');
      }
    }, []);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  ProtectedComponent.getServerSideProps = async (context) => {
    const componentProps = WrappedComponent.getServerSideProps
      ? await WrappedComponent.getServerSideProps(context)
      : {};

    return {
      props: {
        ...componentProps
      }
    };
  };

  return withRouter(ProtectedComponent);
};

export default WithAuth;
