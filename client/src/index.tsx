import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import {store} from './store'

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {blue,red} from '@material-ui/core/colors';


if(process.env.NODE_ENV==='production'){
  console.log = function() {}
}


const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },


  spacing: 4
});

// theme.spacing(2);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


