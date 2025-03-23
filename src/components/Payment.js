import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const gpayImage = require('../assets/gpay.png');
const phonePeImage = require('../assets/phone.png');

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Open modal by default
  const [selectedPayment, setSelectedPayment] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleAddTransaction = () => {
    console.log('Transaction Amount:', transactionAmount);
    handleCloseModal();
  };

  return (
    <>
      {/* Payment Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
              zIndex: 1000,
              width: '400px',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              opacity: isModalOpen ? 1 : 0,
              transform: isModalOpen ? 'translateY(0)' : 'translateY(-10px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="payment-container" style={{ padding: '20px' }}>
              <h3
                className="section-title"
                style={{ fontSize: '18px', marginBottom: '10px', color: '#666' }}
              >
                Preferred Payment
              </h3>

              {/* Google Pay Option */}
              <div
                className="payment-option"
                onClick={() => handlePaymentSelect('Google Pay')}
                style={{
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
                }}
              >
                <div className="payment-logo">
                  <img src={gpayImage} alt="Google Pay" style={{ width: '40px' }} />
                </div>
                <div className="payment-details" style={{ flexGrow: 1, marginLeft: '15px' }}>
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Google Pay</p>
                  <button
                    className="pay-button"
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Pay via Google Pay
                  </button>
                </div>
                <div className="checkmark">
                  {selectedPayment === 'Google Pay' && (
                    <FaCheckCircle style={{ fontSize: '20px', color: '#4CAF50' }} />
                  )}
                </div>
              </div>

              {/* PhonePe Option */}
              <div
                className="payment-option"
                onClick={() => handlePaymentSelect('PhonePe')}
                style={{
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
                }}
              >
                <div className="payment-logo">
                  <img src={phonePeImage} alt="PhonePe" style={{ width: '40px' }} />
                </div>
                <div className="payment-details" style={{ flexGrow: 1, marginLeft: '15px' }}>
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>PhonePe UPI</p>
                  <span style={{ color: '#888', fontSize: '12px' }}>
                    Up to ₹100 cashback on RuPay CC on UPI transactions above ₹299
                  </span>
                </div>
                <div className="checkmark">
                  {selectedPayment === 'PhonePe' && (
                    <FaCheckCircle style={{ fontSize: '20px', color: '#4CAF50' }} />
                  )}
                </div>
              </div>

              {/* Add New UPI ID Option */}
              <div
                className="payment-option"
                onClick={() => handlePaymentSelect('Add New UPI ID')}
                style={{
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
                }}
              >
                <div className="payment-logo">
                  <span style={{ fontSize: '24px', color: '#FF5722' }}>+</span>
                </div>
                <div className="payment-details" style={{ flexGrow: 1, marginLeft: '15px' }}>
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Add New UPI ID</p>
                  <span style={{ color: '#888', fontSize: '12px' }}>
                    You need to have a registered UPI ID
                  </span>
                </div>
              </div>

              {/* Add New Card Option */}
              <div
                className="payment-option"
                onClick={() => handlePaymentSelect('Add New Card')}
                style={{
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
                }}
              >
                <div className="payment-logo">
                  <span style={{ fontSize: '24px', color: '#FF5722' }}>+</span>
                </div>
                <div className="payment-details" style={{ flexGrow: 1, marginLeft: '15px' }}>
                  <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Add New Card</p>
                  <span style={{ color: '#888', fontSize: '12px' }}>
                    Save and pay via cards
                  </span>
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

      {/* Transaction Modal */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
          }}
        >
          <h2>Add Transaction</h2>
          <input
            type="number"
            placeholder="Enter amount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ddd',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handleCloseModal}
              style={{
                backgroundColor: '#ccc',
                color: '#000',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddTransaction}
              style={{
                backgroundColor: '#5caaff',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;