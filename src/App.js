import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🏗️ Train-Track</h1>
      <h2>EHS Training Management System</h2>
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <p>✅ React application is working!</p>
        <p>✅ Deployed successfully on Vercel!</p>
        <p>🚀 Ready to add Train-Track components...</p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>Next Steps:</h3>
          <p>1. ✅ Basic React app deployed</p>
          <p>2. 🔄 Adding components...</p>
          <p>3. 🎯 Full Train-Track app</p>
        </div>
      </div>
    </div>
  );
}

export default App;
