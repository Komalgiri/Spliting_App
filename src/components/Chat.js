import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Open Chat
      </button>

      {isOpen && (
        <div style={modalStyles}>
          <div style={headerStyles}>
            <h2 style={{ margin: '0', color: '#fff' }}>Group Chat</h2>
            <div>
              <button style={iconButtonStyles} title="Phone Call">
                <FontAwesomeIcon icon={faPhone} />
              </button>
              <button style={iconButtonStyles} title="Video Call">
                <FontAwesomeIcon icon={faVideo} />
              </button>
            </div>
          </div>

          <div style={chatBoxStyles}>
            <div style={messageStyles}>Hello! How can I help you today?</div>
            <div style={inputContainerStyles}>
              <input type="text" placeholder="Type a message..." style={inputStyles} />
              <button style={sendButtonStyles}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '400px',
  backgroundColor: '#2e2e2e',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#4b4b4b',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const iconButtonStyles = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#fff',
  fontSize: '20px',
  marginLeft: '10px',
};

const chatBoxStyles = {
  flex: 1,
  padding: '10px',
  overflowY: 'auto',
};

const messageStyles = {
  padding: '8px',
  margin: '5px 0',
  backgroundColor: '#444',
  borderRadius: '4px',
  color: '#fff',
};

const inputContainerStyles = {
  display: 'flex',
  marginTop: '10px',
};

const inputStyles = {
  flex: 1,
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginRight: '10px',
};

const sendButtonStyles = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ChatModal;
