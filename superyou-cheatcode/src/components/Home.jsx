import React from 'react';

// Categories mapping to internal IDs or names
const CATEGORIES = [
  { id: 'Cheesecake', label: 'Cheesecake', color: '#F3E5DC' },
  { id: 'Chocolate', label: 'Chocolate', color: '#EBE0D6' },
  { id: 'Indian Sweet', label: 'Indian Sweet', color: '#FDF6E3' },
  { id: 'Cold Dessert', label: 'Cold Dessert', color: '#E0F2F1' },
  { id: 'Quick Mug Dessert', label: 'Quick Mug Dessert', color: '#EFEBE9' },
  { id: 'Savoury Indulgence', label: 'Savoury Indulgence', color: '#FFF3E0' },
];

const Home = ({ onSelectCategory }) => {
  return (
    <div className="home-container fade-in">
      <header className="header">
        <div className="brand">SuperYou Labs <span style={{ opacity: 0.5 }}>| CheatCode</span></div>
      </header>

      <main className="main-content">
        <h1 className="prompt">What do you feel like eating today?</h1>

        <div className="grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
              style={{ backgroundColor: cat.color }}
            >
              <span className="label">{cat.label}</span>
            </button>
          ))}
        </div>
      </main>

      <style>{`
        .home-container {
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .header {
          margin-bottom: 40px;
          font-size: 0.8rem;
          color: var(--color-accent-brown);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .prompt {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 40px;
          line-height: 1.2;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .category-card {
          aspect-ratio: 1;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          text-align: center;
          transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: var(--shadow-soft);
          border: 1px solid rgba(255,255,255,0.5);
        }
        .category-card:active {
          transform: scale(0.96);
        }
        .label {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-accent-brown);
        }
      `}</style>
    </div>
  );
};

export default Home;
