import Todo from './components/Todo';
import Login from './components/Login';

import React, { Fragment, useState } from 'react';
import '@fontsource/raleway/700.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/400.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeIsLogin = (x: boolean) => setIsLoggedIn(x);

  return <Fragment>{isLoggedIn ? <Todo /> : <Login setIsLogin={changeIsLogin} />}</Fragment>;
};

export default App;
