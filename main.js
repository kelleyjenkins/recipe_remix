let clicks = 6
$('.add-ingredient').on('click', function(){
   $('.ingredient-form-inputs').append(`<input title='ingredient-name' label='ingredient-name'type='text' data-id="${clicks}" class='name-input' placeholder='Ingredient'></br>`)
   clicks++
})

$('.ingredient-button').click(() => validateForm(event))

const validateForm = (event) => {
  event.preventDefault()
  if($('.name-input').val() === "") {
    alert("You must add at least 1 ingredient")
  }
  else getIngredients()
}

const getIngredients = () => {
  let array = $('.ingredient-form-inputs').find('input.name-input')
  let ingArray = [...array]
  let ingredientList = []

  ingArray.forEach(function(element) {
    if(element.value != ("")) {
      ingredientList.push(element.value)
    }
  })
  getRecipes()
}


const getRecipes = () => {
  fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=apples,sugar,flour&number=25&ranking=1',
  {method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': 't1NNs7WYHvmshTq0gMCn9OJP0Omcp1nYWGPjsn4RgFm16WaU5W'
    }
  })
    .then((response) => response.json())
    .then((myJson) => {
      const recipes =  Object.keys(myJson).map((recipe) =>  myJson[recipe])
        showRecipes(recipes)
      })
    }


const showRecipes = (recipes) => {
  recipes.forEach((recipe) => {
  })
}
