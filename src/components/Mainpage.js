import React, { useState, useRef, useEffect } from 'react';
import { FaPlusCircle, FaCheckCircle } from 'react-icons/fa';
 // Importing icons from react-icons
import gpayImage from '../assets/gpay.png';
import phonePeImage from '../assets/phone.png';
import applogo from '../assets/app_logo.jpg';


const MainPage = () => {
  const [currentTab, setCurrentTab] = useState('Transactions');
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false); // New state for transaction modal
  const [selectedPayment, setSelectedPayment] = useState('Google Pay');
  
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState(''); 
  const [transactionAmount, setTransactionAmount] = useState('');
  
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberUPI, setNewMemberUPI] = useState('');
  const [members, setMembers] = useState([]);
  const [qrImageURL, setQRImageURL] = useState('');
  const [uploadedQR, setUploadedQR] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const tabRefs = useRef([]);
  
  
  const tabs = ['Transactions', 'Debts', 'Members', 'Permissions', 'Recent Activity'];

  useEffect(() => {
    updateIndicator();
  }, [currentTab]);

  const updateIndicator = () => {
    const activeTab = tabRefs.current[tabs.indexOf(currentTab)];
    if (activeTab) {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  };
  const handleAddMemberqr = () => {
    const newMember = {
      name: newMemberName,
      phone: newMemberPhone,
      upi: newMemberUPI,
      qr: uploadedQR, // Make sure this variable contains the URL of the uploaded QR code image
    };
  
    setMembers((prevMembers) => [...prevMembers, newMember]);
    setNewMemberName('');
    setNewMemberPhone('');
    setNewMemberUPI('');
    setUploadedQR(null); // Reset if necessary
    handleCloseMemberModal(); // Close the modal after adding
  };
  
  const handleQRUpload = (file) => {
    // Logic to handle file upload and set qrImageURL
  };
  
  const handleCloseMemberModalqr = () => {
    setIsMemberModalOpen(false);
    // Reset input fields
    setNewMemberName('');
    setNewMemberPhone('');
    setNewMemberUPI('');
    setQRImageURL(null);
  };
  const handleOpenChatModal = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    updateIndicator();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment('Google Pay'); // Reset to default selection
  };

  
  const handleOpenMemberModal = () => {
    setIsMemberModalOpen(true);
  };

  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
    setNewMemberName(''); // Reset to default member name
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleAddMember = () => {
    // Logic to add member can be implemented here
    alert(`Member ${newMemberName} added!`);
    handleCloseMemberModal();
  };
  const handleOpenTransactionModal = () => {
    setIsTransactionModalOpen(true); // Open transaction modal
  };

  const handleCloseTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setTransactionAmount(''); // Reset transaction amount
  };
  const handleAddTransaction = () => {
    alert(`Transaction of ₹${transactionAmount} added!`);
    handleCloseTransactionModal();
  };
  

  return (
    <div style={{ padding: '20px', color: darkMode ? '#fff' : '#000', backgroundColor: darkMode ? '#1f1f1f' : '#f5f5f5', minHeight: '100vh', position: 'relative' }}>
      {/* Header with Logo and Icons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: darkMode ? '1px solid #444' : '1px solid #ddd' }}>
      <div style={{ fontSize: '10px', height:'30px', fontWeight: 'bold', color: darkMode ? '#5caaff' : '#333' }}>
          <img style={{height:'30px', display:"flex", justifyContent:"center",}} src={applogo} alt="Logo"></img>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button style={{ background: 'none', border: 'none', color: darkMode ? '#fff' : '#000', cursor: 'pointer', fontSize: '18px' }} onClick={() => alert('Notifications')}>
            🔔
          </button>
          <button style={{ background: 'none', border: 'none', color: darkMode ? '#fff' : '#000', cursor: 'pointer', fontSize: '18px' }} onClick={toggleDarkMode}>
            {darkMode ? '🌙' : '☀️'}
          </button>
          <button style={{ background: 'none', border: 'none', color: darkMode ? '#fff' : '#000', cursor: 'pointer', fontSize: '18px' }} onClick={() => alert('Profile')}>
            👤
          </button>
        </div>
      </div>

      {/* Group Name and Balance */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#5caaff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>BillBird</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>₹4000.00</p>
          <span>should pay</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3>Total spent: ₹150</h3>
          <p>Komal Giri should pay</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px', borderBottom: darkMode ? '1px solid #444' : '1px solid #ddd', paddingBottom: '10px' }}>
        {tabs.map((tab) => (
          <div
            key={tab}
            ref={(el) => (tabRefs.current[tabs.indexOf(tab)] = el)}
            style={{
              color: tab === currentTab ? '#5caaff' : darkMode ? '#888' : '#333',
              fontSize: '16px',
              padding: '10px 0',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: 0, height: '3px', backgroundColor: '#5caaff', transition: 'left 0.3s ease, width 0.3s ease', ...indicatorStyle }} />
      </div>

      

      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      {currentTab === 'Transactions' && (
          <button
            style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={handleOpenTransactionModal} // Open the transaction modal
          >
            + Add Transaction
          </button>
        )}
        {currentTab === 'Debts' && (
          <button
            style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={() => alert('Manage Debts')}
          >
            + Manage Debts
          </button>
        )}
       
        {currentTab === 'Members' && (
          <button
            style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={handleOpenMemberModal} // Use the correct handler here
          >
            + Add Member
          </button>
        )}

        {currentTab === 'Permissions' && (
          <button
            style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={() => alert('Manage Permissions')}
          >
            + Manage Permissions
          </button>
        )}
        {currentTab === 'Recent Activity' && (
          <button
            style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={() => alert('View Recent Activity')}
          >
            + View Activity
          </button>
        )}
      </div>


      {/* Floating Action Buttons */}
      <button style={{ position: 'absolute', bottom: '80px', right: '20px', width: '60px', height: '60px', backgroundColor: '#5caaff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }} onClick={handleOpenModal}>
        💰
      </button>
      <button 
        style={{ position: 'absolute', bottom: '150px', right: '20px', width: '60px', height: '60px', backgroundColor: '#5caaff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }} 
        onClick={handleOpenChatModal}
      >
        💬
      </button>

      {/* Payment Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }} onClick={handleCloseModal}>
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            color: '#000',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '400px',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            opacity: isModalOpen ? 1 : 0,
            transform: isModalOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
          }} onClick={(e) => e.stopPropagation()}>
            <div className="payment-container" style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}>
              <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '10px', color: '#666' }}>Preferred Payment</h3>

              <div className="payment-option" onClick={() => handlePaymentSelect('Google Pay')} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '15px',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}>
                <div className="payment-logo">
                <img src={gpayImage} alt="Google Pay" style={{ width: '40px' }} />
                </div>
                <div className="payment-details" style={{ flexGrow: 1, marginLeft: '15px' }}>
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Google Pay</p>
                  <button className="pay-button" style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}>Pay via Google Pay</button>
                </div>
                <div className="checkmark">
                  {selectedPayment === 'Google Pay' && <FaCheckCircle style={{ fontSize: '20px', color: '#4CAF50' }} />}
                </div>
              </div>

              <h4 className="sub-title" style={{ fontSize: '16px', marginBottom: '10px', color: '#666' }}>Pay by any UPI App</h4>

              <div className="payment-option" onClick={() => handlePaymentSelect('PhonePe UPI')} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '15px',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
              }}>
                <div className="payment-logo">
                <img src={phonePeImage} alt="PhonePe UPI" style={{ width: '40px' }} />

                </div>
                <div className="payment-details" style={{ flexGrow: 1, marginLeft: '15px' }}>
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>PhonePe UPI</p>
                  <span style={{ fontSize: '12px', color: '#888' }}>Up to ₹100 cashback on RuPay CC on UPI transactions above ₹299</span>
                </div>
                <div className="radio">
                  <input type="radio" name="upi" checked={selectedPayment === 'PhonePe UPI'} readOnly style={{ marginRight: '10px', cursor: 'pointer' }} />
                </div>
              </div>

              <div className="payment-option" onClick={() => handlePaymentSelect('Add New UPI')} style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
              }}>
                <div className="add-new-upi" style={{ flexGrow: 1, textAlign: 'center' }}>
                  <FaPlusCircle style={{ fontSize: '24px', color: '#FF5722' }} />
                  <span style={{ fontWeight: 'bold', marginTop: '5px', display: 'block' }}>Add New UPI ID</span>
                  <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>You need to have a registered UPI ID</p>
                </div>
              </div>

              <h4 className="sub-title" style={{ fontSize: '16px', marginBottom: '10px', color: '#666' }}>Credit & Debit Cards</h4>

              <div className="payment-option" onClick={() => handlePaymentSelect('Add New Card')} style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
              }}>
                <div className="add-new-card" style={{ flexGrow: 1, textAlign: 'center' }}>
                  <FaPlusCircle style={{ fontSize: '24px', color: '#FF5722' }} />
                  <span style={{ fontWeight: 'bold', marginTop: '5px', display: 'block' }}>Add New Card</span>
                  <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>Save and pay via cards</p>
                </div>
              </div>

              <div className="confirmation-message">
                {selectedPayment && (
                  <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                    Selected Payment: {selectedPayment}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isTransactionModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '400px' }}>
            <h2>Add Transaction</h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleCloseTransactionModal} style={{ backgroundColor: '#ccc', color: '#000', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleAddTransaction} style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Member Modal */}
      {/* Member Modal */}
      {isMemberModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h2>Add New Member</h2>
            <input
              type="text"
              placeholder="Enter member name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="tel"
              placeholder="Enter member phone no."
              value={newMemberPhone}
              onChange={(e) => setNewMemberPhone(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={newMemberUPI}
              onChange={(e) => setNewMemberUPI(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleQRUpload(e.target.files[0])}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={handleAddMember}>Add Member</button>
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleCloseMemberModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Chat Modal */}
      {isChatModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h2>Chat with Us</h2>
            <textarea 
              placeholder="Type your message here..." 
              style={{ width: '100%', height: '150px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}
            ></textarea>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button 
                onClick={handleCloseChatModal} 
                style={{ backgroundColor: '#ccc', color: '#000', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Close
              </button>
              <button 
                style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
{/* Members List */}
      {/* Members List */}
      <div style={{ marginTop: '20px' }}>
        {members.length > 0 ? ( // Check if there are members
          members.map((member, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <div>
                <div>{member.name}</div>
                <div style={{ fontSize: 'small', color: '#666' }}>{member.upi}</div>
              </div>
              <div>
                {member.qr && <img src={member.qr} alt="QR Code" style={{ width: '50px', height: '50px' }} />}
              </div>
            </div>
          ))
        ) : (
          <div>No members added yet.</div> // Fallback text if there are no members
        )}
      </div>



    </div>
  );
};

export default MainPage;

