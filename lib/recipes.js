
$(window).on('load', () => {
    loadRecipes()
})

export const loadRecipes = () => {
  let id = localStorage.getItem('user_id')
  fetch(`http://localhost:3000/api/v1/users/${id}/recipes`)
  .then(response => response.json())
  .then(myJson => {
  let recipes = Object.keys(myJson).map(recipe => myJson[recipe])
  appendRecipes(recipes)
  })
}

export const appendRecipes = (recipes) => {
  recipes.forEach((recipe) => {
    $('.recipe_lists').append(`<div class="recipe_list${recipe.id}"><a href="${recipe.url}"><h4 class="recipe${recipe.id}">${recipe.name}</h4></a><button id=${recipe.id} class='delete${recipe.id} list-delete'> Delete</button></div>`)
  })
}
