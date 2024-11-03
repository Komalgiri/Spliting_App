import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Homepage from './components/Homepage';
import MainPage from './components/Mainpage'; // Import the new MainPage component
import Chat from './components/Chat';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/MainPage" element={<MainPage />} /> {/* New route for MainPage */}
        <Route path="/Chat.js" element={<Chat />} />
        
      </Routes>
    </Router>
  );
}

export default App;
