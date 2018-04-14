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
    .then(myJson => {
      let user = myJson.id
      storeUser(user)})
    .catch(error => console.error(error))
};

const storeUser = (id) => {
  localStorage.setItem('user_id', id)
}


const signOut = () => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then(() =>  {
    console.log('User signed out.');
    localStorage.clear()
  });
}

$(".g-signout2").click(signOut)

$(".profile").on('click', function() {
  window.location.href='http://localhost:8080/profile.html';
  return false;
})

$(".home").on('click', function() {
  window.location.href='http://localhost:8080';
  return false;
})


$(window).on('load', () => {
    loadLists()
})

const loadLists = () => {
  let id = localStorage.getItem('user_id')
  console.log(id)
  fetch(`http://localhost:3000/api/v1/users/${id}/lists`)
  .then(response => response.json())
  .then(myJson => {
  let lists = Object.keys(myJson).map(list => myJson[list])
  loadList(lists)
  })
}

const loadList = (lists) => {
  lists.forEach((list) => {
    $('.user_lists').append(`<h4 class="list${list.id}">${list.name}</h4>`)
    loadListIngredients(list)
  })
}

const loadListIngredients = (list) => {
  list.ingredients.forEach((ingredient) => {
    $(`.list${list.id}`).append(`<h6>${ingredient.name}</h6>`)
  })
}


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
