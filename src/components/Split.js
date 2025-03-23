import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Split = ({ groupName }) => {
  const navigate = useNavigate();
  const [splitOption, setSplitOption] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [members, setMembers] = useState(0);
  const [customAmounts, setCustomAmounts] = useState([]);
  const [splits, setSplits] = useState([]);

  const handleSplitOption = (option) => {
    setSplitOption(option);
    setShowModal(true);
    setAmount('');
    setMembers(0);
    setSplits([]);
    setCustomAmounts([]);
  };

  const handleSplit = () => {
    let splitAmounts = [];

    if (splitOption === 'Equal' && amount && members > 0) {
      const equalAmount = (amount / members).toFixed(2);
      splitAmounts = Array.from({ length: members }, (_, index) => ({
        name: `Member ${index + 1}`,
        splitAmount: equalAmount,
      }));
    } else if (splitOption === 'Custom' && customAmounts.length === members) {
      const totalPercentage = customAmounts.reduce((acc, member) => acc + member.percentage, 0);
      splitAmounts = customAmounts.map(member => ({
        ...member,
        splitAmount: ((amount * member.percentage) / totalPercentage).toFixed(2),
      }));
    }

    setSplits(splitAmounts);
    setShowModal(false);
  };

  const handleCustomAmountChange = (index, field, value) => {
    const updatedAmounts = [...customAmounts];
    updatedAmounts[index] = {
      ...updatedAmounts[index],
      [field]: field === 'percentage' ? parseFloat(value) : value,
    };
    setCustomAmounts(updatedAmounts);
  };

  const handleNextClick = () => {
    navigate('/mainpage');
  };

  return (
    <div style={containerStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Let's split your money</h2>
        <div style={splitOptionsStyle}>
          <button onClick={() => handleSplitOption('Equal')} style={splitButtonStyle}>
            Equal
          </button>
          <button onClick={() => handleSplitOption('Custom')} style={splitButtonStyle}>
            Custom
          </button>
        </div>
        <div style={arrowButtonContainer}>
          <button onClick={handleNextClick} style={arrowButtonStyle}>
            <FaArrowRight style={arrowIconStyle} />
          </button>
        </div>
      </div>

      {showModal && (
        <div style={splitOption === 'Equal' ? equalModalStyle : customModalStyle}>
          <h3>{splitOption === 'Equal' ? 'EQUAL SPLIT' : 'CUSTOM SPLIT'}</h3>
          <input
            type="number"
            placeholder="Enter Total Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Enter Number of Members"
            value={members}
            onChange={(e) => setMembers(parseInt(e.target.value))}
            style={inputStyle}
          />
          {splitOption === 'Custom' && members > 0 && (
            <div style={customAmountContainerStyle}>
              {Array.from({ length: members }, (_, index) => (
                <div key={index} style={customInputRowStyle}>
                  <input
                    type="text"
                    placeholder={`Name of Member ${index + 1}`}
                    onChange={(e) => handleCustomAmountChange(index, 'name', e.target.value)}
                    style={customInputStyle}
                  />
                  <input
                    type="number"
                    placeholder={`Percentage for Member ${index + 1}`}
                    onChange={(e) => handleCustomAmountChange(index, 'percentage', e.target.value)}
                    style={customInputStyle}
                  />
                </div>
              ))}
            </div>
          )}
          <button onClick={handleSplit} style={splitButtonStyle}>
            Split
          </button>
        </div>
      )}

      {/* Display circles for split amounts */}
      <div style={circleContainerStyle}>
        {splits.map((split, index) => (
          <div key={index} style={circleStyle(index)}>
            <div style={circleTextStyle}>
              {split.name}
              <br />
              ₹{split.splitAmount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Style objects (adjusted)

const containerStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'black',
  color: 'white',
  position: 'relative',
};

const modalStyle = {
  width: '300px',
  padding: '30px',
  backgroundColor: '#333',
  borderRadius: '10px',
  textAlign: 'center',
  marginBottom: '20px',
  marginTop: '50px', 
};

const titleStyle = {
  color: 'white',
  marginBottom: '20px',
};

const splitOptionsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const splitButtonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  backgroundColor: '#6a6a6a',
  cursor: 'pointer',
  width: '45%',
};

const arrowButtonContainer = {
  display: 'flex',
  justifyContent: 'center',
};

const arrowButtonStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#0077b6',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const arrowIconStyle = {
  color: 'white',
  fontSize: '24px',
};

const equalModalStyle = {
  position: 'absolute',
  top: '25%',
  left: '10%',
  width: '250px',
  padding: '20px',
  backgroundColor: '#444',
  borderRadius: '8px',
  color: 'white',
  textAlign: 'center',
};

const customModalStyle = {
    position: 'absolute',
    top: '25%',
    right: '10%',
    width: '300px', // Increased width for better spacing
    padding: '20px',
    backgroundColor: '#444',
    borderRadius: '8px',
    color: 'white',
    textAlign: 'center',
  };

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const customAmountContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10px',
};

const customInputRowStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Inline name and percentage
    gap: '10px',
    marginBottom: '10px',
    width: '100%',
};
const customInputStyle = {
    flex: 1,
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    margin: '0', // Remove margin between inputs
    width: '45%', // Adjust width to make them inline
  };

const circleContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '80px', // Moved lower to avoid overlapping the modal
    position: 'absolute',
    top: '55%', // Adjusted to lower the circles
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  
  const colors = [
    'rgba(173, 216, 230, 0.8)', // Light blue
    'rgba(144, 238, 144, 0.8)', // Light green
    'rgba(255, 182, 193, 0.8)', // Light pink
    'rgba(255, 228, 181, 0.8)', // Light yellow
    'rgba(221, 160, 221, 0.8)', // Light purple
  ];
  
  const circleStyle = (index) => ({
    width: `${120 + (index % 3) * 40}px`, // Increased size for variety
    height: `${120 + (index % 3) * 40}px`,
    borderRadius: '50%',
    backgroundColor: colors[index % colors.length], // Cycle through the colors
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '-15px', // Maintain overlapping effect
    fontSize: '14px',
  });
  

const circleTextStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: 'black',
};

export default Split;
