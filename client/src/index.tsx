import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configData from "../tsconfig.json";


import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {blue,red} from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


