import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // This should now refer to App.jsx
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

