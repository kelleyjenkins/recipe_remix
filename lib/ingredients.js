import {postListIngredients} from './lists.js'
import {getRecipes} from './recipe_service.js'

export const postIngredients = (ingredientList) => {
  ingredientList.forEach(ingredient => {
    const body = { ingredient: { name: ingredient } };
    fetch('http://localhost:3000/api/v1/ingredients', {
      method: 'POST',
      headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(response => response.json())
    .then(myJson =>
      {
      let ing_id = myJson.id
      postListIngredients(ing_id)
    })
    .catch(error => console.error(error));
  })
};


export const getIngredients = () => {
  let array = $('.ingredient-form-inputs').find('input.name-input');
  let ingArray = [...array];
  let ingredientList = [];

  ingArray.forEach(function (element) {
    if (element.value != "") {
      ingredientList.push(element.value);
    }
  });
  console.log(ingredientList);
  getRecipes(ingredientList);
  postIngredients(ingredientList);
};