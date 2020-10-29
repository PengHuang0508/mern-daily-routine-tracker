import React from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Pages
import Home from './pages/Home';
// Components
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Home />
    </Provider>
  );
};

export default App;
