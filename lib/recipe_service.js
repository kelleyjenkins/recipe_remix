import {foodKey} from '../environment.js'

export const baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes";

export const getConfig = () => {
  return {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': `${foodKey}`
    }
  };
};

export const getRecipes = ingredientList => {
  let stringIngredients = ingredientList.toString();
  fetch(`${baseUrl}/findByIngredients?ingredients=${stringIngredients}&number=5&ranking=1`, getConfig()).then(response => response.json())
  .then(myJson => {
    let recipes = Object.keys(myJson).map(recipe => myJson[recipe]);
    getInformation(recipes);
  });
};

export const getInformation = recipes => {
  recipes.forEach(recipe => {
    let id = recipe.id;
    let title = recipe.title;
    getDescription(id, title);
  });
};

export const getDescription = (id, title) => {
  fetch(`${baseUrl}/${id}/summary`, getConfig())
  .then(response => response.json())
  .then(myJson => {
    let summary = myJson.summary;
    getURL(id, title, summary);
  });
};

export const getURL = (id, title, summary) => {
  fetch(`${baseUrl}/${id}/information`, getConfig()).then(response => response.json()).then(myJson => {
    let url = myJson.sourceUrl;
    let source = myJson.sourceName;
    showRecipes(id, title, summary, source, url);
    showAllRecipes(id, title, summary, source, url);
  });
};

export const showRecipes = (id, title, summary, source, url) => {
  if ($('ul').length < 3) {
    $('.recipe-top3').append(`<div class="recipe-card"><ul class="ul"><a class="recipe_url" href="${url}"><h3 class="title">${title}</h3></a><p>${summary}</p><p>${source}</p><button class="save-recipe" label='save-recipe' type="button" value="Save Recipe">Save Recipe</button></ul></div>`);
  }
};

export const showAllRecipes = (id, title, summary, source, url) => {
  $('.recipes').append(`<div class="recipe-card"><ul class="ul"><a class="recipe_url"  href="${url}"><h3>${title}</h3></a><p>${summary}</p><p>${source}</p><button class="save-recipe" label='save-recipe' type="button" value="Save Recipe">Save Recipe</button></ul></div>`)
}
