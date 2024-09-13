import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuth = (toLogin = false) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && toLogin) {
      router.push('/login');
    }
  }, [isAuthenticated, router, toLogin]);

  return isAuthenticated;
};
