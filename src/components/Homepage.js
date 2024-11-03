import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Background.jpg';
import logoImage from '../assets/app_logo.jpg';
import { v4 as uuidv4 } from 'uuid';
import { FaTimes } from 'react-icons/fa';
import { db } from '../firebase'; // Ensure this path is correct
import { ref, set } from "firebase/database"; // Ensure Firebase methods are properly imported

const Homepage = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showAmountCircle, setShowAmountCircle] = useState(false);
  const [showEqualSplitCircles, setShowEqualSplitCircles] = useState(false); // New state to display equal split circles
  const [showCustomPercentageModal, setShowCustomPercentageModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupTitle, setGroupTitle] = useState('');
  const [groupMembers, setGroupMembers] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState('');
  const [groupId, setGroupId] = useState(uuidv4());
  const [amount, setAmount] = useState('');
  const [splitOption, setSplitOption] = useState('');
  const [equalSplitAmount, setEqualSplitAmount] = useState(0); // New state for split amount
  
  const openCustomPercentageModal = () => {
    setShowCustomPercentageModal(true);
  };

  const closeCustomPercentageModal = () => {
    setShowCustomPercentageModal(false);
  };

  const handleJoinGroup = () => {
    setShowJoinForm(true);
    setShowCreateForm(false);
  };

  const handleCreateGroup = () => {
    setShowCreateForm(true);
    setShowJoinForm(false);
  };

  const handleCreateSubmit = () => {
    const groupData = {
      groupName,
      groupTitle,
      groupMembers: groupMembers.split(',').map(member => member.trim()), // Trim whitespace from member emails
      numberOfMembers,
      groupId,
    };

    const groupRef = ref(db, 'groups/' + groupId);

    set(groupRef, groupData)
      .then(() => {
        console.log("Group created successfully!");
        setShowCreateForm(false);
        setShowAmountCircle(true);
      })
      .catch((error) => {
        console.error("Error creating group: ", error);
      });
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowJoinForm(false);
  };

  const handleCancelForm = () => {
    setShowJoinForm(false);
    setShowCreateForm(false);
  };

  const handleAmountSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowAmountCircle(false);
    setShowEqualSplitCircles(false); // Hide equal split circles on submit
    navigate('/mainpage');
  };

  const handleEqualSplit = () => {
    const totalMembers = parseInt(numberOfMembers);
    if (!isNaN(totalMembers) && totalMembers > 0 && amount) {
      setEqualSplitAmount(amount / totalMembers);
      setShowEqualSplitCircles(true); // Show the equal split circles
    }
  };

  const customPercentageModalStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    position: 'relative',
    minWidth: '500px', // Increased width
    minHeight: '400px', // Increased height
    maxWidth: '80%', // Max width for responsiveness
    maxHeight: '80%', // Max height for responsiveness
    overflowY: 'auto', // Enable scrolling if content exceeds height
  };
  
  const customFieldsContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // Change to column for better alignment
    gap: '15px', // Space between fields
    marginTop: '15px', // Add margin for spacing
  };
  
  const customFieldContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px', // Space between the input fields
  };
  
  const customNameStyle = {
    flex: 1, // Allow the input to take available space
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  
  const customPercentageStyle = {
    flex: 1, // Allow the input to take available space
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  
  const customUpiStyle = {
    flex: 1, // Allow the input to take available space
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        
      }}
    >
      <img
        src={logoImage}
        alt="App Logo"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '100px',
          height: 'auto',
        }}
      />

      {!showAmountCircle && !showCreateForm && !showJoinForm && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '300px', gap: '20px' }}>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.background = 'linear-gradient(45deg, #3700b3, #6a00f4)')}
              onMouseLeave={(e) => (e.target.style.background = 'linear-gradient(45deg, #6200ea, #9b5de5)')}
              onClick={handleJoinGroup}
            >
              Join A Group
            </button>

            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.background = 'linear-gradient(45deg, #3700b3, #6a00f4)')}
              onMouseLeave={(e) => (e.target.style.background = 'linear-gradient(45deg, #6200ea, #9b5de5)')}
              onClick={handleCreateGroup}
            >
              Create A Group
            </button>
          </div>
        </div>
      )}

      {showJoinForm && (
        <div style={formContainerStyle}>
          <FaTimes style={cancelIconStyle} onClick={handleCancelForm} />
          <form onSubmit={handleJoinSubmit}>
            <h3 style={{ color: '#333' }}>Join A Group</h3>
            <input type="text" name="groupId" placeholder="Enter Group ID" required style={inputStyle} />
            <button type="submit" style={submitButtonStyle}>
              Join Group
            </button>
          </form>
        </div>
      )}

      {showCreateForm && (
        <div style={formContainerStyle}>
          <FaTimes style={cancelIconStyle} onClick={handleCancelForm} />
          <h3 style={{ color: '#333' }}>Create A Group</h3>
          <input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} style={inputStyle} required />
          <input type="text" placeholder="Group Title" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)} style={inputStyle} required />
          <input type="text" placeholder="Add Members (comma separated emails)" value={groupMembers} onChange={(e) => setGroupMembers(e.target.value)} style={inputStyle} required />
          <input type="number" placeholder="Number of Members" value={numberOfMembers} onChange={(e) => setNumberOfMembers(e.target.value)} style={inputStyle} required />
          <input type="text" value={`Generated Group ID: ${groupId}`} readOnly style={{ ...inputStyle, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }} />
          <button type="button" onClick={handleCreateSubmit} style={submitButtonStyle}>
            Create Group
          </button>
        </div>
      )}

      {showAmountCircle && (
        <div style={{ ...circleContainerStyle, animation: 'scaleIn 0.5s forwards' }}>
          <h2>Group {groupName}</h2>
          <form onSubmit={handleAmountSubmit} style={circleFormStyle}>
            <h3>Enter Amount</h3>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required style={inputStyle} />

            <div style={splitOptionsStyle}>
              <button type="button" onClick={handleEqualSplit} style={splitButtonStyle}>
                Equal
              </button>
              <button type="button" onClick={openCustomPercentageModal} style={splitButtonStyle}>
                Custom
              </button>
            </div>

            <button type="submit" style={{ ...submitButtonStyle, marginTop: '20px' }}>
              Submit
            </button>
          </form>
        </div>
      )}

      {showEqualSplitCircles && (
        <div style={{ position: 'relative', width: '1000px', height: '300px', margin: '20px auto' }}>
          {[...Array(Number(numberOfMembers))].map((_, index) => {
            const angle = (index / numberOfMembers) * (2 * Math.PI); // Calculate angle
            const radius = 250; // Increase radius for more spacing
            const x = radius * Math.cos(angle); // Calculate x position
            const y = radius * Math.sin(angle) + 20; // Add vertical offset to lower the circles

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '50%',
                  transform: `translate(-50%, 310%) translate(${x}px, ${y}px)`, // Position around the center
                  background: '#f0f0f0',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
              >
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>₹{equalSplitAmount.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      )}





    {showCustomPercentageModal && (
      <div style={customPercentageModalStyle}>
        <FaTimes style={cancelIconStyle} onClick={closeCustomPercentageModal} />
        <h4 style={{ textAlign: 'center' }}>Enter Custom Percentages</h4>
        <div style={customFieldsContainerStyle}>
          {[...Array(Number(numberOfMembers))].map((_, index) => (
            <div key={index} style={customFieldContainerStyle}>
              <input
                type="text"
                placeholder={`Member ${index + 1} Name`}
                required
                style={customNameStyle}
              />
              <input
                type="number"
                placeholder="Percentage"
                required
                style={customPercentageStyle}
              />
              <input
                type="text" // Changed type to "text" for UPI ID
                placeholder="UPI ID"
                required
                style={customUpiStyle}
              />
            </div>
          ))}
        </div>
        <button onClick={closeCustomPercentageModal} style={submitButtonStyle}>
          Done
        </button>
      </div>
    )}

    </div>
  );
};

// Styles (same as your original code)
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '18px',
  color: '#fff',
  background: 'linear-gradient(45deg, #6200ea, #9b5de5)',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s, transform 0.3s',
};

const formContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  zIndex: 10,
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const submitButtonStyle = {
  ...buttonStyle,
  width: '50%',
  marginTop: '10px',
};

const cancelIconStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#999',
};

const circleContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  padding: '20px',
  borderRadius: '50%',
  width: '300px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
};

const circleFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

const splitOptionsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '10px',
};

const splitButtonStyle = {
  ...buttonStyle,
  padding: '7px 18px',
  fontSize: '16px',
  width: '45%',
};

const customPercentageModalStyle = {
  ...formContainerStyle,
  width: '300px',
};

const customFieldContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '10px',
};

const customNameStyle = {
  ...inputStyle,
  width: '60%',
};

const customPercentageStyle = {
  ...inputStyle,
  width: '35%',
};

const equalSplitCircleStyle = {
  background: '#f0f0f0',
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
};

export default Homepage;
