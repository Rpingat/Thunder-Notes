import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, Button, useColorMode, Text } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';  // Import useNavigate
import Notepad from './components/Notepad';
import Login from './components/Login';
import { supabase } from './supabaseClient';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // useNavigate hook to programmatically navigate

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsLoggedIn(true);
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');  // Navigate back to the homepage after logout
  };

  const handleLoginSignup = () => {
    navigate('/login');  // Programmatically navigate to the /login route
  };

  return (
    <ChakraProvider>
      <Flex direction="column" height="100vh">
        <Flex p={4} justify="space-between" align="center">
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          {isLoggedIn ? (
            <Flex align="center">
              <Text mr={4}>Logged in as: {user?.email}</Text>
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            </Flex>
          ) : (
            <Button colorScheme="teal" onClick={handleLoginSignup}>
              Login / Signup
            </Button>
          )}
        </Flex>

        <Box flex="1" p={4}>
          <Routes>
            <Route path="/" element={<Notepad isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;

