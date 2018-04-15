/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _login = __webpack_require__(1);

	var _recipe_service = __webpack_require__(2);

	var _lists = __webpack_require__(3);

	var _home_view = __webpack_require__(4);

	var _ingredients = __webpack_require__(5);

	(0, _login.signOutListener)();
	(0, _home_view.homeEventListeners)();

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var signOutListener = function signOutListener() {
	  $(".g-signout2").click(signOut);
	};

	window.onSignIn = function (googleUser) {
	  var profile = googleUser.getBasicProfile();
	  var id_token = googleUser.getAuthResponse().id_token;
	  console.log('Name: ' + profile.getName());
	  // console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail());
	  console.log(id_token);
	  createUser(profile, id_token);
	};

	var signOut = function signOut() {
	  var auth2 = gapi.auth2.getAuthInstance();
	  auth2.signOut().then(function () {
	    console.log('User signed out.');
	    localStorage.clear();
	  });
	};

	var createUser = function createUser(profile, id_token) {
	  var body = { user: { name: profile.getName(),
	      email: profile.getEmail(),
	      token: id_token
	    } };
	  fetch('http://localhost:3000/api/v1/users', {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  }).then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    var user = myJson.id;
	    storeUser(user);
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

	var storeUser = function storeUser(id) {
	  localStorage.setItem('user_id', id);
	};

	module.exports = { onSignIn: onSignIn, signOutListener: signOutListener };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var baseUrl = exports.baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes";

	var getConfig = exports.getConfig = function getConfig() {
	  return {
	    method: "GET",
	    headers: {
	      'Content-Type': 'application/json',
	      'X-Mashape-Key': 'sh5Hj5YExGmshRW1Nnp8L36hII9Sp1vaIyTjsn05ZeCafAbmL5'
	    }
	  };
	};

	var getRecipes = exports.getRecipes = function getRecipes(ingredientList) {
	  var stringIngredients = ingredientList.toString();
	  fetch(baseUrl + "/findByIngredients?ingredients=" + stringIngredients + "&number=5&ranking=1", getConfig()).then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    var recipes = Object.keys(myJson).map(function (recipe) {
	      return myJson[recipe];
	    });
	    getInformation(recipes);
	  });
	};

	var getInformation = exports.getInformation = function getInformation(recipes) {
	  recipes.forEach(function (recipe) {
	    var id = recipe.id;
	    var title = recipe.title;
	    getDescription(id, title);
	  });
	};

	var getDescription = exports.getDescription = function getDescription(id, title) {
	  fetch(baseUrl + "/" + id + "/summary", getConfig()).then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    var summary = myJson.summary;
	    getURL(id, title, summary);
	  });
	};

	var getURL = exports.getURL = function getURL(id, title, summary) {
	  fetch(baseUrl + "/" + id + "/information", getConfig()).then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    var url = myJson.sourceUrl;
	    var source = myJson.sourceName;
	    showRecipes(id, title, summary, source, url);
	  });
	};

	var showRecipes = exports.showRecipes = function showRecipes(id, title, summary, source, url) {
	  $('.recipe-top3').append("<a href=\"" + url + "\"><h2>" + title + "</h2></a><h5>" + summary + "</h5><h5>" + source + "</h5>");
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleListDelete = handleListDelete;

	$(window).on('load', function () {
	  loadLists();
	});

	var loadLists = exports.loadLists = function loadLists() {
	  var id = localStorage.getItem('user_id');
	  console.log(id);
	  fetch('http://localhost:3000/api/v1/users/' + id + '/lists').then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    var lists = Object.keys(myJson).map(function (list) {
	      return myJson[list];
	    });
	    loadList(lists);
	  });
	};

	var loadList = exports.loadList = function loadList(lists) {
	  lists.forEach(function (list) {
	    $('.user_lists').append('<div class="userlist' + list.id + '"><h4 class="list' + list.id + '">' + list.name + '</h4><button id = ' + list.id + ' class=\'delete' + list.id + ' list-delete\'> Delete</button></div>');
	    loadListIngredients(list);
	  });
	};

	var loadListIngredients = exports.loadListIngredients = function loadListIngredients(list) {
	  list.ingredients.forEach(function (ingredient) {
	    $('.list' + list.id).append('<h6>' + ingredient.name + '</h6>\n');
	  });
	};

	var postListIngredients = exports.postListIngredients = function postListIngredients(ing_id) {
	  var id_list = localStorage.getItem('list_id');
	  var body = { list_ingredient: { list_id: id_list, ingredient_id: ing_id
	    } };
	  fetch('http://localhost:3000/api/v1/list_ingredients', {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  }).then(function (response) {
	    return response.text();
	  }).then(function (myres) {
	    return console.log(myres);
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

	var postList = exports.postList = function postList() {
	  var list = $('.list-name')[0].value;
	  var id = localStorage.getItem('user_id');
	  var body = { list: { name: list, user_id: id } };
	  return fetch('http://localhost:3000/api/v1/lists', {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  }).then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    localStorage.setItem('list_id', myJson.id);
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

	$('.user_lists').on('click', '.list-delete', function () {
	  handleListDelete.call(this);
	});

	function handleListDelete() {
	  var listId = this.id;
	  console.log(this);
	  removeList(listId);
	  $('.userlist' + this.id).remove();
	}

	var removeList = exports.removeList = function removeList(listId) {
	  fetch('http://localhost:3000/api/v1/lists/' + listId, {
	    method: 'Delete'
	  }).then(function (response) {
	    return console.log(response);
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var homeEventListeners = exports.homeEventListeners = function homeEventListeners() {

	  var clicks = 6;
	  $('.add-ingredient').on('click', function () {
	    $('.ingredient-form-inputs').append('<input title=\'ingredient-name\' label=\'ingredient-name\'type=\'text\' data-id="' + clicks + '" class=\'name-input\' placeholder=\'Ingredient\'></br>');
	    clicks++;
	  });

	  $('.ingredient-button').click(function () {
	    return validateForm(event);
	  });

	  $(".profile").on('click', function () {
	    window.location.href = 'http://localhost:8080/profile.html';
	    return false;
	  });

	  $(".home").on('click', function () {
	    window.location.href = 'http://localhost:8080';
	    return false;
	  });
	};

	var validateForm = function validateForm(event) {
	  event.preventDefault();
	  if ($('.name-input').val() === "") {
	    alert("You must add at least 1 ingredient");
	  } else postList().then(getIngredients);
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var postIngredients = exports.postIngredients = function postIngredients(ingredientList) {
	  ingredientList.forEach(function (ingredient) {
	    var body = { ingredient: { name: ingredient } };
	    fetch('http://localhost:3000/api/v1/ingredients', {
	      method: 'POST',
	      headers: { 'Accept': 'application/json',
	        'Content-Type': 'application/json' },
	      body: JSON.stringify(body)
	    }).then(function (response) {
	      return response.json();
	    }).then(function (myJson) {
	      var ing_id = myJson.id;
	      postListIngredients(ing_id);
	    }).catch(function (error) {
	      return console.error(error);
	    });
	  });
	};

	var getIngredients = exports.getIngredients = function getIngredients() {
	  var array = $('.ingredient-form-inputs').find('input.name-input');
	  var ingArray = [].concat(_toConsumableArray(array));
	  var ingredientList = [];

	  ingArray.forEach(function (element) {
	    if (element.value != "") {
	      ingredientList.push(element.value);
	    }
	  });
	  console.log(ingredientList);
	  getRecipes(ingredientList);
	  postIngredients(ingredientList);
	};

/***/ })
/******/ ]);