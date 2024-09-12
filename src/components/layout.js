import { Button, Typography, IconButton } from "../lib/mat-tailwind";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen items-stretch">
      {/* Navbar */}
      <nav className="!w-screen bg-white px-6 py-4">
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="text-gray-800">
            Eventeer
          </Typography>
          <div className="flex items-center space-x-4">
            <Button color="green" variant="filled" size="sm" className="rounded-none">
              Sign Up
            </Button>
            <Button color="green" variant="outlined" size="sm" className="rounded-none">
              Log In
            </Button>
          </div>
          <IconButton
            variant="text"
            className="md:hidden ml-2"
            ripple={false}
            size="sm"
          >
            <span className="material-icons">menu</span>
          </IconButton>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 mt-auto text-center shadow-inner">
        <Typography variant="small" className="text-gray-500">
          © 2024 Eventeer. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default Layout;
