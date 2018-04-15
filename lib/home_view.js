import {postList} from './lists.js'
import {getIngredients} from './ingredients.js'

export const homeEventListeners = () => {

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

  $(".home").on('click', function() {
    window.location.href='http://localhost:8080';
    return false;
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
