import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// Pages
import Home from './pages/Home';
// Components
import Navbar from './components/Navbar/Navbar';
import './App.css';

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
