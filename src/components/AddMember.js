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