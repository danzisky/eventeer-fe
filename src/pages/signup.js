import { useDispatch } from 'react-redux';
import { signup } from '@/store/authSlice';
import { useState } from 'react';
import { Input, Button, Typography, Card, CardBody, CardFooter } from '@material-tailwind/react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const isAuthenticated = useAuth();
  const router = useRouter();
  if (isAuthenticated) router.push('/');
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-lg">
        <CardBody className="px-8 py-6">
          <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full"
              size="lg"
            />
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
              Sign Up
            </Button>
          </form>
        </CardBody>
        <CardFooter className="px-8 py-4 text-center">
          <Typography variant="small" className="text-gray-600">
            Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
