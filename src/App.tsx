import React, { Fragment } from 'react';
import Todo from './components/Todo';
import Login from './components/Login';

import '@fontsource/raleway/700.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/400.css';

const App = () => {
  return (
    <Fragment>
      <Login />
      <Todo hide={true} />
    </Fragment>
  );
};

export default App;
