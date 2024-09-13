import React, { useState } from 'react';
import { Box, Button, Input, Text, Stack } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      onLogin();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box maxW="sm" mx="auto" p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Login / Signup
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} mt={4}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" colorScheme="teal">
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </Stack>
      </form>
    </Box>
  );
};

export default Login;

