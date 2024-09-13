import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useState } from 'react';
import { Input, Button, Typography, Card, CardBody, CardFooter } from '@material-tailwind/react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-sm shadow-lg">
        <CardBody className="px-8 py-6">
          <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full"
              size="lg"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full"
              size="lg"
            />
            <Button type="submit" color="blue" variant="filled" className="w-full">
              Login
            </Button>
          </form>
        </CardBody>
        <CardFooter className="px-8 py-4 text-center">
          <Typography variant="small" className="text-gray-600">
            Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign up</a>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
