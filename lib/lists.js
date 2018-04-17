
$(window).on('load', () => {
    loadLists()
})

export const loadLists = () => {
  let id = localStorage.getItem('user_id')
  console.log(id)
  fetch(`http://localhost:3000/api/v1/users/${id}/lists`)
  .then(response => response.json())
  .then(myJson => {
  let lists = Object.keys(myJson).map(list => myJson[list])
  loadList(lists)
  })
}

export const loadList = (lists) => {
  lists.forEach((list) => {
    $('.user_lists').append(`<div class="userlist"><h4 class="list${list.id}">${list.name}</h4><button id = ${list.id} class='delete${list.id} list-delete'> Delete</button></div>`)
    loadListIngredients(list)
  })
}

export const loadListIngredients = (list) => {
  list.ingredients.forEach((ingredient) => {
    $(`.list${list.id}`).append(`<h6>${ingredient.name}</h6>
`)
  })
}

export const postListIngredients = (ing_id) => {
  const id_list = localStorage.getItem('list_id')
  const body = { list_ingredient: { list_id: id_list, ingredient_id: ing_id
  } };
  fetch('http://localhost:3000/api/v1/list_ingredients', {
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(response => response.text())
  .then(myres => console.log(myres))
  .catch(error => console.error(error))
}

export const postList = () => {
   let list = $('.list-name')[0].value
   let id = localStorage.getItem('user_id')
   const body =  { list: { name: list, user_id: id} }
   return fetch('http://localhost:3000/api/v1/lists', {
     method: 'POST',
     headers: { 'Accept': 'application/json',
       'Content-Type': 'application/json' },
     body: JSON.stringify(body)
   }).then(response => response.json())
   .then(myJson => {
     localStorage.setItem('list_id', myJson.id)
   })
   .catch(error => console.error(error));
}

$('.user_lists').on('click', '.list-delete', function() {
  handleListDelete.call(this)
})

export function handleListDelete() {
    const listId = this.id
    console.log(this)
    removeList(listId)
    $(`.userlist${this.id}`).remove()
}

export const removeList = (listId) => {
        fetch(`http://localhost:3000/api/v1/lists/${listId}`,{
        method: 'Delete'
    })
    .then(response =>  console.log(response))
    .catch((error) => console.error(error))
}
