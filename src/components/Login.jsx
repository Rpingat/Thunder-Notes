import React, { useState } from 'react';
import { Box, Button, Input, Text, Stack, Spinner } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    setError(null); // Reset error on new attempt
    try {
      let authResult;
      if (isSignUp) {
        authResult = await supabase.auth.signUp({ email, password });
      } else {
        authResult = await supabase.auth.signInWithPassword({ email, password });
      }
      if (authResult.error) throw authResult.error;
      onLogin(); // Successful login/signup
    } catch (error) {
      setError(error.message); // Show error message
    } finally {
      setIsLoading(false); // Hide loading spinner
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
          <Button type="submit" colorScheme="teal" isDisabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : isSignUp ? 'Sign Up' : 'Login'}
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

