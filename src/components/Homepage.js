import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import GroupImage from '../assets/welcome.jpg'; // Replace with your actual image path

const Homepage = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState('');
  const [groupId, setGroupId] = useState(uuidv4());

  const notifications = [
    { groupName: 'Group A', description: 'Description for Group A', debtAmount: '$100' },
    { groupName: 'Group B', description: 'Description for Group B', debtAmount: '$250' },
    { groupName: 'Group C', description: 'Description for Group C', debtAmount: '$75' },
  ];

  const handleJoinGroup = () => {
    setShowJoinForm(true);
    setShowCreateForm(false);
  };

  const handleCreateGroup = () => {
    setShowCreateForm(true);
    setShowJoinForm(false);
  };

  const handleCancelForm = () => {
    setShowJoinForm(false);
    setShowCreateForm(false);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    navigate('/Mainpage');
  };

  const navigateToMainPage = () => {
    navigate('/Mainpage');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000', // Black background
      color: '#fff',
      textAlign: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        left: '5%',
        top: '20%',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 10,
      }}>
        {notifications.map((notification, index) => (
          <div key={index} style={{
            backgroundColor: '#ffffff', // Light background for each notification
            padding: '10px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
            width: '100%',
            color: '#333',
          }}>
            {/* Icon Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5', // Background color for icon area
              borderRadius: '50%',
              width: '40px',
              height: '40px',
            }}>
              {/* Replace with actual icon */}
              <span style={{ fontSize: '1.5rem' }}>🌿</span>
            </div>
            
            {/* Text Content Section */}
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <h3 style={{ fontSize: '1rem', margin: '0', color: '#000' }}>{notification.groupName}</h3>
              <p style={{ fontSize: '0.9rem', margin: '0', color: '#555' }}>{notification.description}</p>
              <p style={{ fontSize: '0.8rem', margin: '0', color: '#888' }}>Debt: {notification.debtAmount}</p>
            </div>
            
            {/* Date/Time Section */}
            <p style={{ fontSize: '0.8rem', color: '#aaa' }}>2 Days Ago</p>
          </div>
        ))}
      </div>
       

      {/* Title Section */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>WELCOME TO BILBIRD</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Split bills with us</p>

      {/* Image Section */}
      <img
        src={GroupImage}
        alt="Group illustration"
        style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
      />

      {/* Button Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
        <button
          onClick={handleCreateGroup}
          style={{
            padding: '10px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#28a745',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Create your own group
        </button>
        <button
          onClick={handleJoinGroup}
          style={{
            padding: '10px',
            fontSize: '1rem',
            color: '#28a745',
            backgroundColor: '#fff',
            border: '2px solid #28a745',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Join an existing group
        </button>

        {/* New Split Amount Button */}
        <div style={{ textAlign: 'center', fontSize: '1rem', color: '#ccc', margin: '10px 0' }}>
          OR
        </div>
        <button
          onClick={() => navigate('/split')}
          style={{
            padding: '10px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#ffc107',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Split Amount
        </button>
      </div>

      {/* Join Group Modal */}
      {showJoinForm && (
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          padding: '20px',
          backgroundColor: '#333',
          borderRadius: '8px',
          width: '300px',
          textAlign: 'center',
        }}>
          <FaTimes
            onClick={handleCancelForm}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: '#fff',
              cursor: 'pointer',
            }}
          />
          <form>
            <h3 style={{ color: '#fff' }}>Join a Group</h3>
            <input
              type="text"
              placeholder="Enter Group ID"
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: 'none',
              }}
            />
            <div style={{
              width: '100%',
              textAlign: 'center',
              color: '#ccc',
              margin: '10px 0',
              padding: '5px',
              borderTop: '1px solid #555',
              borderBottom: '1px solid #555',
            }}>
              or
            </div>
            <button
              type="button"
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#555',
                color: '#fff',
              }}
            >
              Join with QR Code
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                color: '#fff',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Join Group
            </button>
          </form>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateForm && (
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          padding: '20px',
          backgroundColor: '#333',
          borderRadius: '8px',
          width: '300px',
          maxHeight: '80vh', // Prevent overlapping by restricting modal height
          overflowY: 'auto', // Enable scrolling if content overflows
          textAlign: 'center',
        }}>
          <FaTimes
            onClick={handleCancelForm}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: '#fff',
              cursor: 'pointer',
            }}
          />
          <h3 style={{ color: '#fff' }}>Let's Create Your Group</h3>
          <form onSubmit={handleCreateSubmit}>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: 'none',
              }}
            />
            <input
              type="number"
              placeholder="Number of Members"
              value={numberOfMembers}
              onChange={(e) => setNumberOfMembers(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: 'none',
              }}
            />
            {/* Optional Fields */}
            <input
              type="text"
              placeholder="Group Purpose (optional)"
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: 'none',
              }}
            />
            <select
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: 'none',
                color: '#555',
              }}
            >
              <option value="public">Public Group</option>
              <option value="private">Private Group</option>
            </select>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              
              
               
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '1rem',
                  color: '#fff',
                  backgroundColor: '#28a745',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Homepage;
