const baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes";

function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  let id_token = googleUser.getAuthResponse().id_token;
  console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  console.log(id_token)
  createUser(profile, id_token);
}

const createUser = (profile, id_token) => {
  let body = { user: { name: profile.getName(),
      email: profile.getEmail(),
      token: id_token
    } };
  fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json())
  .then(myJson => console.log(myJson))
    .catch(error => console.error(error))
};


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$(".g-signout2").click(signOut)


let clicks = 6;
$('.add-ingredient').on('click', function () {
  $('.ingredient-form-inputs').append(`<input title='ingredient-name' label='ingredient-name'type='text' data-id="${clicks}" class='name-input' placeholder='Ingredient'></br>`);
  clicks++;
});

$('.ingredient-button').click(() => validateForm(event));

const validateForm = event => {
  event.preventDefault();
  if ($('.name-input').val() === "") {
    alert("You must add at least 1 ingredient");
  } else getIngredients();
};

const getIngredients = () => {
  let array = $('.ingredient-form-inputs').find('input.name-input');
  let ingArray = [...array];
  let ingredientList = [];

  ingArray.forEach(function (element) {
    if (element.value != "") {
      ingredientList.push(element.value);
    }
  });
  getRecipes(ingredientList);
  postIngredients(ingredientList);
};

const postIngredients = ingredientList => {
  ingredientList.forEach(ingredient => {
    const body = { ingredient: { name: ingredient } };
    fetch('http://localhost:3000/api/v1/ingredients', {
      method: 'POST',
      headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(response => response.json())
    .catch(error => console.error(error));
  });
};

const getConfig = () => {
  return {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': 'key'
    }
  };
};

const getRecipes = ingredientList => {
  let stringIngredients = ingredientList.toString();
  fetch(`${baseUrl}/findByIngredients?ingredients=${stringIngredients}&number=5&ranking=1`, getConfig()).then(response => response.json()).then(myJson => {
    let recipes = Object.keys(myJson).map(recipe => myJson[recipe]);
    getInformation(recipes);
  });
};

const getInformation = recipes => {
  recipes.forEach(recipe => {
    let id = recipe.id;
    let title = recipe.title;
    getDescription(id, title);
  });
};

const getDescription = (id, title) => {
  fetch(`${baseUrl}/${id}/summary`, getConfig()).then(response => response.json()).then(myJson => {
    let summary = myJson.summary;
    getURL(id, title, summary);
  });
};

const getURL = (id, title, summary) => {
  fetch(`${baseUrl}/${id}/information`, getConfig()).then(response => response.json()).then(myJson => {
    let url = myJson.sourceUrl;
    let source = myJson.sourceName;
    showRecipes(id, title, summary, source, url);
  });
};

const showRecipes = (id, title, summary, source, url) => {
  $('.recipe-top3').append(`<a href="${url}"><h2>${title}</h2></a><h5>${summary}</h5><h5>${source}</h5>`);
};
