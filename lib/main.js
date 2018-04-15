import {onSignIn, signOutListener} from './login.js';

import {getRecipes, getInformation, getDescription, getURL, showRecipes, baseUrl, getConfig} from './recipe_service.js'

import {loadLists, loadList, loadListIngredients, postListIngredients, postList, handleListDelete, removeList} from './lists.js'

import {homeEventListeners} from './home_view.js'

import {postIngredients, getIngredients} from './ingredients.js'

signOutListener()
homeEventListeners()

// $(".profile").on('click', function() {
//   window.location.href='http://localhost:8080/profile.html';
//   return false;
// })

// $(window).on('load', () => {
//     loadLists()
// })
//
// const loadLists = () => {
//   let id = localStorage.getItem('user_id')
//   console.log(id)
//   fetch(`http://localhost:3000/api/v1/users/${id}/lists`)
//   .then(response => response.json())
//   .then(myJson => {
//   let lists = Object.keys(myJson).map(list => myJson[list])
//   loadList(lists)
//   })
// }
//
// const loadList = (lists) => {
//   lists.forEach((list) => {
//     $('.user_lists').append(`<div class="userlist${list.id}"><h4 class="list${list.id}">${list.name}</h4><button id = ${list.id} class='delete${list.id} list-delete'> Delete</button></div>`)
//     loadListIngredients(list)
//   })
// }
//
// $('.user_lists').on('click', '.list-delete', function() {
//   handleListDelete.call(this)
// })
//
// function handleListDelete() {
//     const listId = this.id
//     console.log(this)
//     removeList(listId)
//     $(`.userlist${this.id}`).remove()
// }
//
// export const removeList = (listId) => {
//         fetch(`http://localhost:3000/api/v1/lists/${listId}`,{
//         method: 'Delete'
//     })
//     .then(response =>  console.log(response))
//     .catch((error) => console.error(error))
// }

// const loadListIngredients = (list) => {
//   list.ingredients.forEach((ingredient) => {
//     $(`.list${list.id}`).append(`<h6>${ingredient.name}</h6>
// `)
//   })
// }


// let clicks = 6;
// $('.add-ingredient').on('click', function () {
//   $('.ingredient-form-inputs').append(`<input title='ingredient-name' label='ingredient-name'type='text' data-id="${clicks}" class='name-input' placeholder='Ingredient'></br>`);
//   clicks++;
// });
//
// $('.ingredient-button').click(() => validateForm(event));
//
// const validateForm = event => {
//   event.preventDefault();
//   if ($('.name-input').val() === "") {
//     alert("You must add at least 1 ingredient");
//   } else
//
//   postList()
//   .then(getIngredients)
// };

// const postList = () => {
//    let list = $('.list-name')[0].value
//    let id = localStorage.getItem('user_id')
//    const body =  { list: { name: list, user_id: id} }
//    return fetch('http://localhost:3000/api/v1/lists', {
//      method: 'POST',
//      headers: { 'Accept': 'application/json',
//        'Content-Type': 'application/json' },
//      body: JSON.stringify(body)
//    }).then(response => response.json())
//    .then(myJson => {
//      localStorage.setItem('list_id', myJson.id)
//    })
//    .catch(error => console.error(error));
// }

// const getIngredients = () => {
//   let array = $('.ingredient-form-inputs').find('input.name-input');
//   let ingArray = [...array];
//   let ingredientList = [];
//
//   ingArray.forEach(function (element) {
//     if (element.value != "") {
//       ingredientList.push(element.value);
//     }
//   });
//   console.log(ingredientList);
//   getRecipes(ingredientList);
//   postIngredients(ingredientList);
// };

// const postIngredients = (ingredientList) => {
//   ingredientList.forEach(ingredient => {
//     const body = { ingredient: { name: ingredient } };
//     fetch('http://localhost:3000/api/v1/ingredients', {
//       method: 'POST',
//       headers: { 'Accept': 'application/json',
//         'Content-Type': 'application/json' },
//       body: JSON.stringify(body)
//     }).then(response => response.json())
//     .then(myJson =>
//       {
//       let ing_id = myJson.id
//       postListIngredients(ing_id)
//     })
//     .catch(error => console.error(error));
//   })
// };
//
// const postListIngredients = (ing_id) => {
//   const id_list = localStorage.getItem('list_id')
//   const body = { list_ingredient: { list_id: id_list, ingredient_id: ing_id
//   } };
//   fetch('http://localhost:3000/api/v1/list_ingredients', {
//     method: 'POST',
//     headers: { 'Accept': 'application/json',
//       'Content-Type': 'application/json' },
//     body: JSON.stringify(body)
//   })
//   .then(response => response.text())
//   .then(myres => console.log(myres))
//   .catch(error => console.error(error))
// }
