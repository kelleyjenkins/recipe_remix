
export const baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes";

export const getConfig = () => {
  return {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': 'key'
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
  });
};

export const showRecipes = (id, title, summary, source, url) => {
  $('.recipe-top3').append(`<a href="${url}"><h2>${title}</h2></a><h5>${summary}</h5><h5>${source}</h5>`);
};
