// import {foodKey} from '../environment.js'

export const baseUrl = "http://api.yummly.com/v1/api";

export const getConfig = () => {
  return {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Yummly-App-ID': '',
      'X-Yummly-App-Key': ''
    }
  };
};

export const getRecipes = query => {
  fetch(`${baseUrl}/recipes?${query}`, getConfig())
  .then(response => response.json())
  .then(myJson => {
    let recipes = myJson.matches;
    getId(recipes);
  });
};

export const getId = recipes => {
  recipes.forEach(recipe => {
    let id = recipe.id;
    getInformation(id)
  });
};

export const getInformation = (id) => {
  fetch(`${baseUrl}/recipe/${id}`, getConfig()).then(response => response.json()).then(myJson => {
    let name = myJson.name;
    let source = myJson.source.sourceDisplayName;
    let url = myJson.source.sourceRecipeUrl
    let time = myJson.totalTime
    console.log(name)
    showRecipes(id, name, time, source, url);
    showAllRecipes(id, name, time, source, url);
  });
};


export const showRecipes = (id, name, time, source, url) => {
  if ($('ul').length < 3) {
    $('.recipe-top3').append(`<div class="recipe-card"><ul class="ul"><a class="recipe_url" href="${url}"><h3 class="title">${name}</h3></a><p>${source}</p><p>${time}</p><button class="save-recipe" label='save-recipe' type="button" value="Save Recipe">Save Recipe</button></ul></div>`);
  }
};

export const showAllRecipes = (id, name, time, source, url) => {
  $('.recipes').append(`<div class="recipe-card"><ul class="ul"><a class="recipe_url"  href="${url}"><h3>${name}</h3></a><p>${source}</p><p>${time}</p><button class="save-recipe" label='save-recipe' type="button" value="Save Recipe">Save Recipe</button></ul></div>`)
}
