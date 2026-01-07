import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import InputScreen from './components/InputScreen';
import RecipeView from './components/RecipeView';
import IntelligenceView from './components/IntelligenceView';
import { getRecommendedRecipes } from './utils/chefLogic';

function App() {
  const [view, setView] = useState('HOME');
  const [category, setCategory] = useState(null);
  const [constraints, setConstraints] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const handleCategorySelect = (catId) => {
    setCategory(catId);
    setView('INPUT');
  };

  const handleShowRecipes = (inputConstraints) => {
    setConstraints(inputConstraints);
    const recipes = getRecommendedRecipes(category, inputConstraints.time);
    setFilteredRecipes(recipes);
    setView('RECIPES');
  };

  return (
    <Layout>
      {view === 'HOME' && (
        <>
          <Home onSelectCategory={handleCategorySelect} />
          <div style={{
            textAlign: 'center',
            paddingBottom: '10px',
            opacity: 0.3,
            fontSize: '0.7rem',
            cursor: 'pointer'
          }}
            onClick={() => setView('INTELLIGENCE')}
          >
            SuperYou Labs v0.9 // Internal View
          </div>
        </>
      )}

      {view === 'INPUT' && (
        <InputScreen
          onBack={() => setView('HOME')}
          onShowRecipes={handleShowRecipes}
        />
      )}

      {view === 'RECIPES' && (
        <RecipeView
          recipes={filteredRecipes}
          constraints={constraints}
          onBack={() => setView('INPUT')}
        />
      )}

      {view === 'INTELLIGENCE' && (
        <IntelligenceView onBack={() => setView('HOME')} />
      )}
    </Layout>
  );
}

export default App;
