import React, { useState } from 'react';

const ChatModal = () => {
  // State for controlling the modal visibility
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Function to close the chat modal
  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  // Function to open the chat modal (for demonstration purposes)
  const handleOpenChatModal = () => {
    setIsChatModalOpen(true);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f0f2f5', // Light background color
    }}>
      {/* Button to open the modal */}
      <button onClick={handleOpenChatModal} style={{
        backgroundColor: '#5caaff',
        color: '#fff',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Soft shadow for button
      }}>
        Chat with Us
      </button>

      {/* Chat Modal */}
      {isChatModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}>
          <div style={{
            backgroundColor: '#222', // Dark background for the modal
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            color: '#fff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Soft shadow
          }}>
            <h2 style={{ marginBottom: '15px', fontSize: '22px', color: '#fff' }}>Chat with Us</h2>
            
            <textarea
              placeholder="Type your message here..."
              style={{
                width: '100%',
                height: '150px',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #555',
                backgroundColor: '#333',
                color: '#fff',
                marginBottom: '15px',
                resize: 'none',
              }}
            ></textarea>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handleCloseChatModal}
                style={{
                  backgroundColor: '#444', // Dark close button
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              <button
                style={{
                  backgroundColor: '#5caaff', // Blue send button
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;