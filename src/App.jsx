import React from 'react';
import axios from 'axios';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Pages
import Home from './pages/Home';
// Components
import Navbar from './components/Navbar/Navbar';

axios.defaults.baseURL = 'http://localhost:5000/';

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Home />
    </Provider>
  );
};

export default App;
