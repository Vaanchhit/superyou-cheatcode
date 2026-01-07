/**
 * Core Intelligence for SuperYou CheatCode
 * 
 * Logic:
 * 1. Adjusts ingredient quantities (Scoops/Crumbs) based on protein target.
 * 2. Provides substitution ideas.
 */

import { recipes } from '../data/recipes';

export function getRecommendedRecipes(category, timeConstraint) {
    let filtered = recipes;

    if (category) {
        if (category === 'Quick Mug Dessert') {
            filtered = filtered.filter(r => r.tags && r.tags.includes('Quick Mug Dessert'));
        } else {
            filtered = filtered.filter(r => r.category === category);
        }
    }

    if (timeConstraint) {
        if (timeConstraint === '10min') {
            filtered = filtered.filter(r => r.time <= 12); // Tolerance
        } else if (timeConstraint === '20min') {
            filtered = filtered.filter(r => r.time <= 25);
        } else if (timeConstraint === '45min') {
            filtered = filtered.filter(r => r.time <= 50);
        } else if (timeConstraint === 'nobake') {
            filtered = filtered.filter(r => r.noBake === true);
        }
    }

    return filtered;
}

export function adjustRecipe(recipe, targetProtein) {
    if (!recipe) return null;

    const adjusted = { ...recipe, ingredients: [...recipe.ingredients], steps: [...recipe.steps] };
    const minBase = recipe.baseProteinRange[0];
    const maxBase = recipe.baseProteinRange[1];
    const avgBase = (minBase + maxBase) / 2;

    const diff = targetProtein - avgBase;
    adjusted.finalProtein = targetProtein;
    adjusted.finalCalories = 200 + (targetProtein * 4) + (recipe.time * 2); // Heuristic formula

    // LOGIC: Adjust scoop counts or add crumbles to meet target
    let adjustmentMsg = "";

    if (targetProtein >= 30) {
        // High Target: Needs ~2 Scoops + Biscuit boost
        adjusted.ingredients = adjusted.ingredients.map(ing => {
            if (ing.includes('1 scoop')) return ing.replace('1 scoop', '2 scoops');
            return ing;
        });
        // If no biscuit crumb in ingredients, add it
        if (!adjusted.ingredients.some(i => i.includes('crumbs'))) {
            adjusted.ingredients.push('2 tbsp HPSB/ICB Crumbs (for extra protein crunch)');
        }
        adjustmentMsg = "Boosted to 2 scoops + extra crumbs.";
    }
    else if (targetProtein >= 24) {
        // Med-High Target: Needs 1.5 Scoops
        adjusted.ingredients = adjusted.ingredients.map(ing => {
            if (ing.includes('1 scoop')) return ing.replace('1 scoop', '1.5 scoops');
            return ing;
        });
        adjustmentMsg = "Increased to 1.5 scoops.";
    }
    else if (targetProtein <= 15) {
        // Low Target: 0.5 - 1 Scoop is enough
        // Often the base recipe is 1 scoop ~ 20g, so we might reduce
        adjusted.ingredients = adjusted.ingredients.map(ing => {
            if (ing.includes('1 scoop')) return ing.replace('1 scoop', '0.5 scoop');
            return ing;
        });
        adjustmentMsg = "Light version: 0.5 scoop used.";
    } else {
        adjustmentMsg = "Standard balanced recipe.";
    }

    adjusted.adjustedNote = adjustmentMsg;

    // Substitution Logic (Simple Map)
    adjusted.substitutions = {
        'Jaggery': 'Honey (use 0.7x amount)',
        'Eggs': 'Flax Egg (1 tbsp flax + 3 tbsp water)',
        'Cream Cheese': 'Hung Curd + Lemon Juice'
    };

    return adjusted;
}
