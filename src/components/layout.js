"use client";
import { Button, Typography } from "@/lib/mat-tailwind";
import Link from "next/link";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, rehydrateAuth } from '@/store/authSlice';
import { useAuth } from "@/hooks/useAuth";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  const isAuthenticated = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <div className="flex flex-col min-h-screen items-stretch text-gray-900">
      {/* Navbar */}
      <nav className="!w-screen bg-white px-6 py-4 shadow-sm border-b">
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="text-gray-800">
            Eventeer
          </Typography>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button color="green" variant="filled" size="sm" className="rounded-none">
                  Sign Up
                </Button>
                <Link href="/login">
                  <Button color="green" variant="outlined" size="sm" className="rounded-none">
                    Log In
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                color="green"
                variant="outlined"
                size="sm"
                className="rounded-none"
              >
                Log Out
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-200 flex flex-col md:flex-row items-stretch gap-4">
        {isAuthenticated && (
          <nav className="w-full md:w-[20rem] h-auto bg-gray-50 p-4 flex flex-col divide-y text-gray-700">
            <Link href="/" className="p-4 hover:bg-gray-200">
              Home
            </Link>
            <Link href="/events" className="p-4 hover:bg-gray-200">
              Events
            </Link>
          </nav>
        )}
        <div className="w-full">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 mt-auto text-center border-t">
        <Typography variant="small" className="text-gray-500">
          © 2024 Eventeer. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default Layout;
