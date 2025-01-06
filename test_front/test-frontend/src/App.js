import React from 'react';
import AppRouter from './routes/AppRouter';
import './styles/main.css';

const App = () => {
  return (
    <div className="app-container">
      <AppRouter />
    </div>
  );
};

export default App;
console.log('App loaded');
