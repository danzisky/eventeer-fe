import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

const withAuth = (WrappedComponent) => {
  const RequiresAuth = (props) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    // If authenticated, render the wrapped component
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    // Optionally, return a loading screen or null while redirecting
    return null;
  };

  return RequiresAuth;
};

export default withAuth;