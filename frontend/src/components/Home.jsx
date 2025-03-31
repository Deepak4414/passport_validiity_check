import React from 'react';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the International Student Passport</h1>
            <p>Your gateway to managing student information efficiently.</p>
            <button 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => alert('Explore more features!')}
            >
                Get Started
            </button>
        </div>
    );
};

export default Home;