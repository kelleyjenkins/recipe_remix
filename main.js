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
    getRecipes(ingredientList)
    postIngredientList(ingredientList)
  })
}

