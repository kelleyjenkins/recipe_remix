import {postList, findListRecipes} from './lists.js'
import {getIngredients, formatIngs} from './ingredients.js'
import {getRecipes} from './recipe_service.js'
import {handleSave, handleRecipeDelete} from './users_recipes.js'

export const homeEventListeners = () => {

if (window.location.pathname == "/recipes.html") {
  $(window).on('load', () => {
    $('body').show();
    const ingList = localStorage.getItem('ingredients');
    let ingredientList = JSON.parse(ingList)
    formatIngs(ingredientList)
  })
};

  $(document).ready(() => {
    $('body').hide();
    $('.more-recipes').hide();
    $(window).on('load', function() {
       $('body').show();
     });
  });

  let clicks = 6;
  $('.add-ingredient').on('click', function () {
    $('.ingredient-form-inputs').append(`<input title='ingredient-name' label='ingredient-name'type='text' data-id="${clicks}" class='name-input' placeholder='Ingredient'></br>`);
    clicks++;
  });

  $('.ingredient-button').on('click', function() {
    validateForm(event)
    $('.more-recipes').show();
  });

  $(".profile").on('click', function() {
    window.location.href='http://rigid-downtown.surge.sh/profile.html';
    localStorage.removeItem('ingredients');
    return false;
  })

  $('.home').on('click', function() {
    localStorage.removeItem('ingredients');
    window.location.href='http://rigid-downtown.surge.sh/';
    return false;
  })

  $('.more-recipes').on('click', function() {
    window.location.href='http://rigid-downtown.surge.sh/recipes.html';
  })

  $('.recipe-top3').on('click', '.save-recipe', function() {
    handleSave.call(this)
  })
  $('.recipes').on('click', '.save-recipe', function() {
    handleSave.call(this)
  })

  $('.recipe_lists').on('click', '.recipe-delete', function() {
    handleRecipeDelete.call(this)
  })

  $('.user_lists').on('click', '.get-recipes', function() {
    findListRecipes.call(this);
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
