import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
//import gpayImage from '../assets/gpay.png';
//import phonePeImage from '../assets/phone.png';
import applogo from '../assets/app_logo.jpg';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUsergroupAdd } from 'react-icons/ai'; // Import a group icon

const MainPage = () => {
  const [currentTab, setCurrentTab] = useState('Transactions');
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [darkMode, setDarkMode] = useState(true);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [setMembers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  //const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionCategory, setTransactionCategory] = useState('');
  const [setReceiptFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible] = useState(false);

  const tabRefs = useRef([]);

  const navigate = useNavigate();

  const tabs = useMemo(() => ['Transactions', 'Debts', 'Members', 'Recent Activity'], []);
  const updateIndicator = useCallback(() => {
    const activeTab = tabRefs.current[tabs.indexOf(currentTab)];
    if (activeTab) {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  }, [currentTab, tabs, tabRefs]); // ✅ Now it's memoized properly
  
  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]); // ✅ No ESLint warning now
  

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    updateIndicator();
  };
  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    setReceiptFile(file);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenTransactionModal = () => {
    setIsTransactionModalOpen(true);
  };

  const handleCloseTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setTransactionAmount('');
  };

  const handleAddTransaction = () => {
    setRecentActivity((prev) => [...prev, `Transaction of ₹${transactionAmount} added!`]);

    handleCloseTransactionModal();
  };
  

  const handleOpenMemberModal = () => {
    setIsMemberModalOpen(true);
  };

  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
    setNewMemberName('');
  };

  const handleAddMember = () => {
    setMembers((prev) => [...prev, newMemberName]);
setRecentActivity((prev) => [...prev,` ${newMemberName} added as a new member!`]);

    handleCloseMemberModal();
  };

  const handleOpenDebtModal = () => {
    setIsDebtModalOpen(true);
  };

  const handleCloseDebtModal = () => {
    setIsDebtModalOpen(false);
    setDebtAmount('');
  };

  const handleManageDebts = () => {
    setRecentActivity((prev) => [...prev,`Debt of ₹${debtAmount} managed!` ]);
    handleCloseDebtModal();
  };

  const handleOpenChatModal = () => {
    navigate('/ChatModal');
  };

  const handleOpenModal = () => {
    navigate('/payment');
  };
   // Inline styles defined within the component for Member modal
   const styles = {
    card: {
      width: '350px',
      padding: '20px',
      backgroundColor: '#333',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
      margin: '40px auto',
      color: '#f0f0f0',
    },
    cardTitle: {
      marginTop: 0,
      color: '#f0f0f0',
    },
    cardButton: {
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#f0f0f0',
      fontSize: '16px',
      cursor: 'pointer',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: '#222',
      padding: '20px',
      width: '300px',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#f0f0f0',
    },
    modalTitle: {
      margin: '0 0 20px',
      color: '#f0f0f0',
    },
    modalLabel: {
      alignSelf: 'flex-start',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#bbb',
    },
    modalInput: {
      width: '95%',
      padding: '8px',
      marginBottom: '8px',
      border: '1px solid #555',
      borderRadius: '4px',
      backgroundColor: '#444',
      color: '#f0f0f0',
    },
    modalButton: {
      width: '100%',
      padding: '10px',
      marginTop: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#6da3ff',
      color: '#f0f0f0',
      fontSize: '16px',
      cursor: 'pointer',
    },
    cancelButton: {
      width: '100%',
      padding: '10px',
      marginTop: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#555',
      color: '#f0f0f0',
      fontSize: '16px',
      cursor: 'pointer',
  },
  };

  const style = {
    body: {
      display: 'flex',
      justifyContent: 'center', // Fixed typo
      alignItems: 'center',      // Fixed typo
      height: '100vh',
      margin: 0,
      backgroundColor: '#333',   // Fixed typo
      color: '#fff',
      fontFamily: 'Arial, sans-serif' // Fixed extra comma
    },
  
    container: {
      backgroundColor: '#1c1c1c',  // Fixed typo
      padding: '20px',
      borderRadius: '8px',         // Fixed typo
      width: '300px',
      position: 'relative',        // Added quotes
      textAlign: 'left',           // Fixed typo
      transform: 'translateY(-10%)' // Fixed typo and added quotes
    },
  
    heading: {                      // Changed container h1 to a heading style object
      fontSize: '2em',              // Fixed typo
      margin: 0
    },
  
    payInfo: {                      // Changed .pay-info to payInfo
      fontSize: '1.2em',            // Fixed typo
      marginTop: '20px',
      color: '#ffc107'
    },
  
    buttons: {                      // Changed .buttons to buttons
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      gap: '20px'                   // Added quotes
    },
  
    button: {                       // Changed .button to button
      backgroundColor: '#444',
      border: 'none',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      textAlign: 'center',
      width: '120px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
  
    buttonChartIcon: {              // Changed .button .fa-chart-bar to buttonChartIcon
      marginLeft: '8px'
    },
  
    buttonEllipsisIcon: {           // Changed .button .fa-ellipsis-v to buttonEllipsisIcon
      marginRight: '10px'
    },
  
    buttonHover: {                  // Changed .button:hover to buttonHover (use inline style for hover)
      backgroundColor: '#555'
    },
  
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      display: 'none',              // Initially hidden
      backgroundColor: '#3a3a3a',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
      borderRadius: '5px',
      zIndex: 1,
      width: '180px',
      padding: '2px 0'
    },
  
    dropdownItem: {                 // Changed .dropdown-item to dropdownItem
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      color: '#fff',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '0.9em'
    },
  
    dropdownItemHover: {            // Changed .dropdown-item:hover to dropdownItemHover (use inline style for hover)
      backgroundColor: '#555'
    },
  
    dropdownItemIcon: {             // Changed .dropdown-item i to dropdownItemIcon
      marginRight: '8px',
      fontSize: '1.2em'
    }
  };
  


  return (
    <div style={{ padding: '10px', color: darkMode ? '#fff' : '#000', backgroundColor: darkMode ? '#1f1f1f' : '#f5f5f5', minHeight: '100vh', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px', borderBottom: darkMode ? '1px solid #444' : '1px solid #ddd' }}>
        <div style={{ fontSize: '10px', height: '30px', fontWeight: 'bold', color: darkMode ? '#5caaff' : '#333' }}>
          <img style={{ height: '30px', display: "flex", justifyContent: "center" }} src={applogo} alt="Logo" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button style={{ background: 'none', border: 'none', color: darkMode ? '#fff' : '#000', cursor: 'pointer', fontSize: '18px' }} onClick={() => alert('Notifications')}>
            🔔
          </button>
          <button style={{ background: 'none', border: 'none', color: darkMode ? '#fff' : '#000', cursor: 'pointer', fontSize: '18px' }} onClick={toggleDarkMode}>
            {darkMode ? '🌙' : '☀'}
          </button>
          <button style={{ background: 'none', border: 'none', color: darkMode ? '#fff' : '#000', cursor: 'pointer', fontSize: '18px' }} onClick={() => alert('Profile')}>
            👤
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ width: '140px', height: '140px', borderRadius: '50%', backgroundColor: '#5caaff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',marginTop:'20px',marginBottom:'1px' }}>
        {/* Add content like icon or text here */}
        <AiOutlineUsergroupAdd size={40} style={{ marginBottom: '10px' }} /> {/* Added group icon */}
          <span>Total Amount</span>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>₹4000.00</p>
        </div>
        <div style={{ textAlign: 'left' }}>
        <p>Transactions: <span>11</span></p>
        <p>Members: <span>6</span></p>
        <p>Total spent: <span>₹1,732</span></p>
        <p>Komal Giri should pay</p>
        <div className="buttons">
        <button className="button" style={{...style.button,marginRight:'10px'}} onClick={() => window.location.href = 'charts.html'}>
          Show charts <i className="fas fa-chart-bar"></i>
        </button>

        <button className="button" style={{...style.button,marginRight:'5px'}} onClick={toggleDropdown}>
          More <i className="fas fa-ellipsis-v"></i>
        </button>
        {isDropdownVisible && (
          <div className="dropdown" id="dropdown">
            <div className="dropdown-item" onClick={() => window.location.href = 'edit.html'}>
              <i className="fas fa-edit"></i>Edit group
            </div>
            <div className="dropdown-item" onClick={() => window.location.href = 'export.csv'}>
              <i className="fas fa-file-csv"></i>Export as CSV file
            </div>
            <div className="dropdown-item" onClick={() => window.location.href = 'share.html'}>
              <i className="fas fa-share-alt"></i>Share group
            </div>
          </div>
        )}
      </div>
        </div>
       

     
      </div>
      

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '30px', borderBottom: darkMode ? '1px solid #444' : '1px solid #ddd', paddingBottom: '10px' }}>
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
            onClick={handleOpenTransactionModal}
          >
            + Add Transaction
          </button>
        )}
        {currentTab === 'Debts' && (
          <button
            style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={handleOpenDebtModal}
          >
            + Manage Debts
          </button>
        )}
        
        {currentTab === 'Members' && (
          <button
            style={{ backgroundColor: '#5caaff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
            onClick={handleOpenMemberModal}
          >
            + Add Member
          </button>
        )}
        {currentTab === 'Recent Activity' && (
          <div style={{ paddingTop: '10px' }}>
            <h4>Recent Activity:</h4>
            {recentActivity.map((activity, index) => (
              <p key={index} style={{ marginBottom: '5px' }}>{activity}</p>
            ))}
          </div>
        )}
      </div>

      {/* Payment and Chat Modals */}
      <button 
        style={{ position: 'absolute', bottom: '80px', right: '20px', width: '60px', height: '60px', backgroundColor: '#5caaff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }} onClick={handleOpenModal}>
        💰
      </button>
      <button 
        style={{ position: 'absolute', bottom: '20px', right: '20px', width: '60px', height: '60px', backgroundColor: '#5caaff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }} onClick={handleOpenChatModal}>
        🗨
      </button>
    {/*Transaction Modal*/ }
      {isTransactionModalOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#00000099",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      opacity: 1,
      animation: "fadeIn 0.4s forwards"
    }}
    onClick={handleCloseTransactionModal}
  >
    <div
      style={{
        backgroundColor: "#1f2023",
        borderRadius: "16px",
        padding: "25px",
        maxWidth: "450px",
        width: "100%",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease-in-out",
        animation: "slideUp 0.4s ease-in-out"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 style={{ fontSize: "1rem", fontWeight: 300, marginBottom: "20px", color: "#7eaff4", textAlign: "left", fontFamily: "Arial, sans-serif" }}>
        New Expenses
      </h2>

      {/* Amount Input */}
      <input
        type="number"
        value={transactionAmount}
        onChange={(e) => setTransactionAmount(e.target.value)}
        placeholder="Amount"
        style={{
          width: "90%",
          padding: "14px",
          marginBottom: "18px",
          border: "1px solid #444",
          borderRadius: "12px",
          fontSize: "1rem",
          backgroundColor: "#2c2f36",
          color: "#fff",
          transition: "border-color 0.3s ease, background-color 0.3s ease"
        }}
      />

      {/* Description Input */}
      <input
        type="text"
        value={transactionDescription}
        onChange={(e) => setTransactionDescription(e.target.value)}
        placeholder="Description (e.g., Grocery, Rent)"
        style={{
          width: "90%",
          padding: "14px",
          marginBottom: "18px",
          border: "1px solid #444",
          borderRadius: "12px",
          fontSize: "1rem",
          backgroundColor: "#2c2f36",
          color: "#fff"
        }}
      />

      {/* Date Input */}
      <input
        type="date"
        value={transactionDate}
        onChange={(e) => setTransactionDate(e.target.value)}
        style={{
          width: "90%",
          padding: "14px",
          marginBottom: "18px",
          border: "1px solid #444",
          borderRadius: "12px",
          fontSize: "1rem",
          backgroundColor: "#2c2f36",
          color: "#fff"
        }}
      />

      {/* Category Dropdown */}
      <select
        value={transactionCategory}
        onChange={(e) => setTransactionCategory(e.target.value)}
        style={{
          width: "96%",
          padding: "14px",
          marginBottom: "18px",
          border: "1px solid #444",
          borderRadius: "12px",
          fontSize: "1rem",
          backgroundColor: "#2c2f36",
          color: "#fff"
        }}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Others">Others</option>
      </select>

      {/* Receipt Upload */}
      <input
        type="file"
        accept="image/*, .pdf"
        onChange={(e) => handleReceiptUpload(e)}
        style={{
          width: "90%",
          padding: "12px",
          border: "1px solid #444",
          borderRadius: "12px",
          backgroundColor: "#2c2f36",
          color: "#fff",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={handleAddTransaction}
          style={{
            backgroundColor: "grey",
            color: "white",
            padding: "14px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "lightgreen")}
        
        
        >
        <i className="fas fa-redo" style={{ marginRight: "0px" }}></i> Repeat
        </button>
        <button
          onClick={handleCloseTransactionModal}
          style={{
            backgroundColor: "grey",
            color: "white",
            padding: "14px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0099cc")}
           
        
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      {/* Debt Modal */}
      {isDebtModalOpen && (
        <div className="modal" onClick={handleCloseDebtModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Manage Debt</h3>
            <input
              type="number"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
              placeholder="Amount"
            />
            <button onClick={handleManageDebts}>Save</button>
            <button onClick={handleCloseDebtModal}>Cancel</button>
          </div>
        </div>
      )}

       {/* Member Modal */}
       {isMemberModalOpen && (
        <div style={styles.modalOverlay} onClick={handleCloseMemberModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>New Member</h3>
            <label style={styles.modalLabel}>Name of Member</label>
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Enter member's name"
              style={styles.modalInput}
            />
            <button style={styles.modalButton} onClick={handleAddMember}>
              Save
            </button>
            <button style={{ ...styles.modalButton, backgroundColor: '#777' }} onClick={handleCloseMemberModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
