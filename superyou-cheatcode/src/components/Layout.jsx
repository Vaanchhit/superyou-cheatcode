import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <div className="glass-panel main-frame">
                {children}
            </div>
            <style>{`
        .layout-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        .main-frame {
          width: 100%;
          max-width: 450px;
          min-height: 800px; /* Force mobile height feel */
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.85); /* Slightly more opaque for readability */
        }
        @media (max-width: 480px) {
          .layout-container {
            padding: 0;
            align-items: flex-start;
          }
          .main-frame {
            border-radius: 0;
            min-height: 100vh;
          }
        }
      `}</style>
        </div>
    );
};

export default Layout;
