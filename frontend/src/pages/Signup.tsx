import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  InputLabel,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      toast.loading('Signing Up', { id: 'signup' });
      const success = await auth?.signup(name,email, password,confirmPassword);

      toast.success('Signed Up Successfully', { id: 'signup' });
    } catch (error) {
      console.error(error);
      toast.error('Signing Up Failed', { id: 'signup' });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate('/chat');
    }
  }, [auth?.user]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 10,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
        >
          Join Us!
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ fontFamily: 'Inter, sans-serif' }}
        >
          Sign Up to continue.
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          mt={3}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box>
            <InputLabel
              sx={{ color: 'white', fontFamily: 'Inter, sans-serif' }}
            >
              Name
            </InputLabel>
            <TextField
              name="name"
              type="text"
              fullWidth
              placeholder="Enter your name"
              InputProps={{
                style: { color: 'white', fontFamily: 'Inter, sans-serif' },
              }}
            />
          </Box>
          <Box>
            <InputLabel
              sx={{ color: 'white', fontFamily: 'Inter, sans-serif' }}
            >
              Email
            </InputLabel>
            <TextField
              name="email"
              type="email"
              fullWidth
              placeholder="Enter your email"
              InputProps={{
                style: { color: 'white', fontFamily: 'Inter, sans-serif' },
              }}
            />
          </Box>
          <Box>
            <InputLabel
              sx={{ color: 'white', fontFamily: 'Inter, sans-serif' }}
            >
              Password
            </InputLabel>
            <TextField
              name="password"
              type="password"
              fullWidth
              placeholder="Enter password"
              InputProps={{
                style: { color: 'white', fontFamily: 'Inter, sans-serif' },
              }}
            />
          </Box>
          <Box>
            <InputLabel
              sx={{ color: 'white', fontFamily: 'Inter, sans-serif' }}
            >
              Confirm Password
            </InputLabel>
            <TextField
              name="confirmPassword"
              type="password"
              fullWidth
              placeholder="Confirm your password"
              InputProps={{
                style: { color: 'white', fontFamily: 'Inter, sans-serif' },
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
            }}
          >
            Sign Up
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontFamily: 'Inter, sans-serif' }}
          >
            Already have an account?{' '}
            <Link href="/login" underline="hover" color="inherit">
              Log In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default signup;
