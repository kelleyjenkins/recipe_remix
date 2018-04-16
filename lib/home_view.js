import {postList} from './lists.js'
import {getIngredients} from './ingredients.js'
import {getRecipes} from './recipe_service.js'

export const homeEventListeners = () => {

  $(window).on('load', () => {
    const ingList =localStorage.getItem('ingredients')
    getRecipes(ingList)
  });

  let clicks = 6;
  $('.add-ingredient').on('click', function () {
    $('.ingredient-form-inputs').append(`<input title='ingredient-name' label='ingredient-name'type='text' data-id="${clicks}" class='name-input' placeholder='Ingredient'></br>`);
    clicks++;
  });

  $('.ingredient-button').click(() => validateForm(event));

  $(".profile").on('click', function() {
    window.location.href='http://localhost:8080/profile.html';
    return false;
  })

  $('.home').on('click', function() {
    localStorage.removeItem('ingredients');
    window.location.href='http://localhost:8080';
    return false;
  })

  $('.more-recipes').on('click', function() {
    window.location.href='http://localhost:8080/recipes.html';
  })
}

const validateForm = event => {
  event.preventDefault();
  if ($('.name-input').val() === "") {
    alert("You must add at least 1 ingredient");
  } else
  postList()
  .then(getIngredients)
};
