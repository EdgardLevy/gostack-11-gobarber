import React from 'react';

import GlobalStyles from './styles/global';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Edgard' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyles />
  </>
);

export default App;
