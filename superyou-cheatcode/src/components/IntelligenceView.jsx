import React from 'react';

const IntelligenceView = ({ onBack }) => {
    return (
        <div className="intel-container fade-in">
            <button className="back-btn" onClick={onBack}>close terminal</button>

            <div className="header-mono">
                SUPERYOU LABS // INTELLIGENCE
                <br />
                NODE: INDIA_SOUTH_1
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <label>Most Cooked Trend</label>
                    <div className="bar-chart">
                        <div className="bar" style={{ width: '85%' }}>Cheesecake (85%)</div>
                        <div className="bar" style={{ width: '60%' }}>Mug Cake (60%)</div>
                        <div className="bar" style={{ width: '45%' }}>Barfi (45%)</div>
                    </div>
                </div>

                <div className="card">
                    <label>Protein Tolerance</label>
                    <div className="stat-big">24g</div>
                    <div className="sub">Avg per sitting</div>
                </div>

                <div className="card">
                    <label>Form Factor Preference</label>
                    <div className="pie-mock">
                        <span style={{ color: '#4A3C31' }}>■ Solid (60%)</span>
                        <span style={{ color: '#D4C4B7' }}>□ Liquid (40%)</span>
                    </div>
                </div>

                <div className="card full">
                    <label>Success Heatmap</label>
                    <div className="heatmap-mock">
                        High Success: Chocolate + Curd integrations.
                        <br /><br />
                        Low Success: Whey in traditional mithai (moved to yeast protein).
                    </div>
                </div>
            </div>

            <style>{`
        .intel-container {
            padding: 24px;
            background: #111;
            color: #0f0;
            height: 100%;
            font-family: 'Courier New', monospace;
        }
        .back-btn {
            color: #0f0;
            border: 1px solid #0f0;
            padding: 5px 10px;
            margin-bottom: 20px;
            text-transform: uppercase;
            font-size: 0.8rem;
        }
        .header-mono {
            border-bottom: 1px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        .dashboard-grid {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .card {
            border: 1px solid #333;
            padding: 12px;
            background: #000;
        }
        .card label {
            display: block;
            font-size: 0.7rem;
            color: #666;
            margin-bottom: 8px;
            text-transform: uppercase;
        }
        .bar-chart .bar {
            background: #222;
            color: #0f0;
            font-size: 0.7rem;
            padding: 2px 5px;
            margin-bottom: 4px;
            white-space: nowrap;
        }
        .stat-big {
            font-size: 2rem;
            color: #fff;
        }
        .sub {
            font-size: 0.8rem;
            color: #666;
        }
        .heatmap-mock {
            font-size: 0.8rem;
            color: #aaa;
            line-height: 1.4;
        }
      `}</style>
        </div>
    );
};

export default IntelligenceView;
