import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Text, useColorMode, useToast } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Notepad from './components/Notepad';
import Login from './components/Login';
import { supabase } from './supabaseClient';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to check user status.",
          status: "error",
        });
        return;
      }
      if (data?.user) {
        setIsLoggedIn(true);
        setUser(data.user);
      }
    };

    checkUser();
  }, [toast]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "Failed to log out.",
        status: "error",
      });
    }
  };

  const handleLoginSignup = () => {
    navigate('/login');
  };

  return (
    <Box>
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

      <Box p={4}>
        <Routes>
          <Route path="/" element={<Notepad isLoggedIn={isLoggedIn} user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;

