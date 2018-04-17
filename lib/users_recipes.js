
$(window).on('load', () => {
    loadRecipes()
})

// load recipes

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
    $('.recipe_lists').append(`<ul><div class="recipe_list${recipe.id}"><a href="${recipe.url}"><p class="recipe${recipe.id}">${recipe.name}</a><button id=${recipe.id} class='delete${recipe.id} recipe-delete'> Delete</button></p></div></ul>`)
  })
}

//save recipes

export function handleSave() {
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

//delete recipes

export function handleRecipeDelete() {
  const id = this.id
  removeRecipe(id)
  $(`.recipe_list${this.id}`).remove()
}

const removeRecipe = (id) => {
  fetch(`http://localhost:3000/api/v1/recipes/${id}`, {
  method: 'Delete'
  })
  .then(response =>  console.log(response))
  .catch((error) => console.error(error))
}
