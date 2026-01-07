import React, { useState, useMemo } from 'react';
import { adjustRecipe } from '../utils/chefLogic';

const RecipeView = ({ recipes, constraints, onBack }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [localProtein, setLocalProtein] = useState(constraints ? constraints.protein : 25);

    const selectedRecipe = useMemo(() => {
        if (!selectedId) return null;
        const base = recipes.find(r => r.id === selectedId);
        return adjustRecipe(base, localProtein);
    }, [selectedId, recipes, localProtein]);

    if (selectedId && selectedRecipe) {
        return (
            <div className="recipe-detail fade-in">
                <button className="back-btn" onClick={() => setSelectedId(null)}>← Back to results</button>

                {/* Header Section */}
                <div className="recipe-header">
                    <span className="category-tag">{selectedRecipe.category}</span>
                    <h1 className="title">{selectedRecipe.name}</h1>
                    <div className="time-badge">⏱ {selectedRecipe.time} min</div>
                </div>

                {/* Top Strip: Protein Pulse */}
                <div className="protein-strip glass-panel">
                    <div className="protein-ring animate-pulse-ring">
                        <span className="val">{selectedRecipe.finalProtein}g</span>
                        <span className="unit">PRO</span>
                    </div>
                    <div className="strip-info">
                        <span>Approx per serving</span>
                        {selectedRecipe.adjustedNote && <span className="adj-note">✨ {selectedRecipe.adjustedNote}</span>}
                    </div>
                </div>

                {/* Ingredients & Products */}
                <div className="section">
                    <h3>Ingredients</h3>
                    <div className="product-row">
                        {selectedRecipe.superYouProduct.map(prod => (
                            <span key={prod} className="prod-badge">⚡ {prod}</span>
                        ))}
                    </div>
                    <ul className="ing-list">
                        {selectedRecipe.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                        ))}
                    </ul>
                    {selectedRecipe.biscuitIntegration && (
                        <div className="biscuit-tip">
                            🍪 <strong>Biscuit Tip:</strong> {selectedRecipe.biscuitIntegration}
                        </div>
                    )}
                </div>

                {/* Steps */}
                <div className="section">
                    <h3>Method</h3>
                    <div className="steps-container">
                        {selectedRecipe.steps.map((step, i) => (
                            <div key={i} className="step-card glass-panel">
                                <div className="step-num">{i + 1}</div>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Adjustment */}
                <div className="adjust-footer glass-panel">
                    <label>Adjust Protein Goal: {localProtein}g</label>
                    <input
                        type="range"
                        min="15" max="35" step="5"
                        value={localProtein}
                        onChange={(e) => setLocalProtein(Number(e.target.value))}
                        className="slider"
                    />
                </div>

                <div className="why-works">
                    <strong>Why this works:</strong> {selectedRecipe.whyItWorks}
                </div>

                <style>{`
          .recipe-detail { padding: 20px; padding-bottom: 100px; }
          .category-tag { font-size: 0.75rem; text-transform: uppercase; color: #888; letter-spacing: 1px; }
          .title { font-size: 1.8rem; margin: 8px 0; color: var(--color-accent-brown); }
          .time-badge { font-size: 0.9rem; color: #666; margin-bottom: 24px; }
          
          .protein-strip {
             display: flex; align-items: center; padding: 16px; margin-bottom: 30px;
             background: rgba(231, 215, 193, 0.3); /* Beige tint */
          }
          .protein-ring {
              width: 60px; height: 60px;
              border-radius: 50%;
              background: var(--color-accent-brown);
              color: white;
              display: flex; flex-direction: column; align-items: center; justify-content: center;
              margin-right: 16px;
              flex-shrink: 0;
          }
          .protein-ring .val { font-size: 1.2rem; font-weight: 700; line-height: 1; }
          .protein-ring .unit { font-size: 0.6rem; }
          .strip-info { display: flex; flex-direction: column; font-size: 0.9rem; }
          .adj-note { color: #2E7D32; font-size: 0.8rem; font-weight: 500; margin-top: 4px; }

          .section h3 { margin-bottom: 16px; font-size: 1.1rem; color: var(--color-text); }
          .product-row { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
          .prod-badge { background: #fff; border: 1px solid #eee; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; color: var(--color-accent-brown); font-weight: 600; }
          .ing-list { list-style: none; margin-bottom: 16px; }
          .ing-list li { padding: 8px 0; border-bottom: 1px dashed rgba(0,0,0,0.1); font-size: 0.95rem; }
          
          .biscuit-tip { font-size: 0.9rem; background: rgba(255,255,255,0.4); padding: 12px; border-radius: 8px; color: #555; }

          .steps-container { display: flex; flex-direction: column; gap: 12px; }
          .step-card { padding: 16px; display: flex; gap: 12px; align-items: flex-start; }
          .step-num { 
              background: var(--color-accent-beige); color: var(--color-accent-brown); 
              width: 24px; height: 24px; border-radius: 50%; 
              display: flex; align-items: center; justify-content: center; 
              font-weight: 700; font-size: 0.8rem; flex-shrink: 0;
          }

          .adjust-footer {
              position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
              width: 90%; max-width: 400px;
              padding: 16px;
              background: rgba(255,255,255,0.9);
              backdrop-filter: blur(20px);
              z-index: 100;
              box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
          }
          .adjust-footer label { font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 8px; text-align: center; }
          .slider { width: 100%; accent-color: var(--color-accent-brown); }

          .why-works { margin-top: 30px; font-size: 0.9rem; color: #666; line-height: 1.6; font-style: italic; }
        `}</style>
            </div>
        );
    }

    // List View
    return (
        <div className="recipe-list-container fade-in">
            <button className="back-btn" onClick={onBack}>← Back to filter</button>
            <h2 style={{ marginBottom: '20px' }}>Chef's Recommendations</h2>

            <div className="list-grid">
                {recipes.map(r => (
                    <div key={r.id} className="recipe-card glass-panel" onClick={() => setSelectedId(r.id)}>
                        <div className="card-content">
                            <h3>{r.name}</h3>
                            <div className="meta-tags">
                                <span className="tag">{r.time}m</span>
                                <span className="tag pro">{r.baseProteinRange[0]}-{r.baseProteinRange[1]}g Pro</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {recipes.length === 0 && <div style={{ textAlign: 'center', marginTop: 40, opacity: 0.5 }}>No exact matches.</div>}

            <style>{`
           .recipe-list-container { padding: 24px; }
           .list-grid { display: flex; flex-direction: column; gap: 16px; }
           .recipe-card { padding: 20px; cursor: pointer; transition: transform 0.2s; border-left: 4px solid var(--color-accent-beige); }
           .recipe-card:active { transform: scale(0.98); }
           .card-content h3 { margin-bottom: 8px; font-size: 1.1rem; color: var(--color-accent-brown); }
           .meta-tags { display: flex; gap: 8px; }
           .tag { font-size: 0.8rem; background: rgba(255,255,255,0.5); padding: 4px 8px; border-radius: 4px; color: #666; }
           .tag.pro { background: var(--color-accent-beige); color: var(--color-accent-brown); font-weight: 600; }
        `}</style>
        </div>
    );
};

export default RecipeView;
