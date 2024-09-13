import React, { useState } from 'react';
import { ChakraProvider, Box, Flex, Button, useColorMode, useDisclosure, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon, WarningIcon } from '@chakra-ui/icons';
import Login from './components/Login';
import Notepad from './components/Notepad';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider>
      <Flex direction="column" height="100vh">
        <Flex p={4} justify="space-between" align="center">
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <IconButton
            aria-label="Theme Switcher"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Flex>
        <Box flex="1" p={4}>
          {isLoggedIn ? <Notepad /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;

