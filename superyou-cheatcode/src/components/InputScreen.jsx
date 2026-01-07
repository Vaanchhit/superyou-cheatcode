import React, { useState } from 'react';

const InputScreen = ({ onBack, onShowRecipes }) => {
  const [protein, setProtein] = useState(25);
  const [calories, setCalories] = useState(300);
  const [time, setTime] = useState('45min'); // 10min, 20min, 45min, nobake

  return (
    <div className="input-container fade-in">
      <button className="back-btn" onClick={onBack}>← Back</button>

      <h2 className="title">Customize your cheat</h2>

      <div className="control-group">
        <label>Protein Target</label>
        <div className="toggle-row">
          {[15, 25, 35].map(val => (
            <button
              key={val}
              className={`toggle-btn ${protein === val ? 'active' : ''}`}
              onClick={() => setProtein(val)}
            >
              {val}g
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Calorie Limit: {calories} kcal</label>
        <input
          type="range"
          min="150"
          max="500"
          step="10"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>150</span>
          <span>500</span>
        </div>
      </div>

      <div className="control-group">
        <label>Prep Time Limit</label>
        <div className="toggle-row">
          {['10min', '20min', 'nobake'].map(val => (
            <button
              key={val}
              className={`toggle-btn ${time === val ? 'active' : ''}`}
              onClick={() => setTime(val)}
            >
              {val === 'nobake' ? 'No-Bake' : val}
            </button>
          ))}
        </div>
      </div>

      <div className="products-avail">
        <label>Pantry Check (Auto-detected)</label>
        <div className="pantry-tags">
          <span>✅ SuperYou Pro</span>
          <span>✅ Wafers</span>
          <span>✅ Chips</span>
        </div>
      </div>

      <div className="action-area">
        <button
          className="btn-primary"
          onClick={() => onShowRecipes({ protein, calories, time })}
        >
          Reveal Recipes
        </button>
      </div>

      <style>{`
        .input-container {
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .back-btn {
          align-self: flex-start;
          font-size: 0.9rem;
          margin-bottom: 24px;
          color: var(--color-text-light);
        }
        .title {
          font-size: 1.8rem;
          margin-bottom: 40px;
        }
        .control-group {
          margin-bottom: 32px;
        }
        .control-group label {
          display: block;
          margin-bottom: 12px;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .toggle-row {
          display: flex;
          background: #EAEAEA;
          border-radius: 12px;
          padding: 4px;
        }
        .toggle-btn {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--color-text-light);
          transition: all 0.2s ease;
        }
        .toggle-btn.active {
          background: #fff;
          color: var(--color-accent-brown);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-weight: 600;
        }
        .slider {
          width: 100%;
          -webkit-appearance: none;
          height: 6px;
          background: #E0E0E0;
          border-radius: 3px;
          outline: none;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-accent-brown);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #888;
          margin-top: 8px;
        }
        .pantry-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pantry-tags span {
          font-size: 0.8rem;
          background: rgba(255,255,255,0.6);
          padding: 6px 10px;
          border-radius: 20px;
          color: #555;
          border: 1px solid #eee;
        }
        .action-area {
          margin-top: auto;
          display: flex;
          justify-content: center;
          padding-bottom: 20px;
        }
        .btn-primary {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default InputScreen;
