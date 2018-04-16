import {postList} from './lists.js'
import {getIngredients} from './ingredients.js'
import {getRecipes} from './recipe_service.js'

export const homeEventListeners = () => {

  $(window).on('load', () => {
    $('.more-recipes').hide();
    const ingList = localStorage.getItem('ingredients')
    // getRecipes(ingList)
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

  $('.recipe-card').on('click', '.save-recipe', function() {
    handleSave.call(this)
  })
}

 function handleSave() {
   let url = $(this).closest(".recipe-card").find('.recipe_url').attr('href')
   let name = $(this).closest(".recipe-card").find('h3')[0].innerText
   let user = localStorage.getItem('user_id')
   saveRecipe(name, url, user)
}

export const saveRecipe = (name, url, user) => {
  let body = { recipe: { name: name,
      url: url,
      user_id: user
    }}
  fetch(`http://localhost:3000/api/v1/recipes`,{
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .catch(error => console.error(error));
}


const validateForm = event => {
  event.preventDefault();
  if ($('.name-input').val() === "") {
    alert("You must add at least 1 ingredient");
  } else
  postList()
  .then(getIngredients)
};
