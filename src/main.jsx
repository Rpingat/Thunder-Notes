import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRouter from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import customTheme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Router>
        <AppWithRouter />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

