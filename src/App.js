import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Homepage from './components/Homepage';
import MainPage from './components/Mainpage'; // Import the new MainPage component
import Payment from './components/Payment';
import ChatModal from './components/ChatModal';
import Split from './components/Split';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/MainPage" element={<MainPage />} /> {/* New route for MainPage */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/ChatModal" element={<ChatModal />} />
        <Route path="/Split" element={<Split />} />
        
      </Routes>
    </Router>
  );
}

export default App;
