// frontend/src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './toolkit/store';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import UserListPage from './components/UserListPage';
import InterestListPage from './components/InterestListPage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><UserListPage /></PrivateRoute>} />
            <Route path="/interests" element={<PrivateRoute><InterestListPage /></PrivateRoute>} />
            <Route path="/chat/:roomId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;