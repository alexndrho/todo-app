import React, { Fragment } from 'react';
import Todo from './components/Todo';

import '@fontsource/raleway/700.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/400.css';

const App = () => {
  return (
    <Fragment>
      <Todo hide={true} />
    </Fragment>
  );
};

export default App;
