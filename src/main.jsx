import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRouter from './App'; // This should now refer to App.jsx
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AppWithRouter />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

