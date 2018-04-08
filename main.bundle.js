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
/***/ (function(module, exports) {

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
	};

	const getRecipes = ingredientList => {
	  let stringIngredients = ingredientList.toString();
	  fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${stringIngredients}&number=25&ranking=1`, { method: 'get',
	    headers: {
	      'Content-Type': 'application/json',
	      'X-Mashape-Key': 'key'
	    }
	  }).then(response => response.json()).then(myJson => {
	    const recipes = Object.keys(myJson).map(recipe => myJson[recipe]);
	    showRecipes(recipes);
	  });
	};

	getInformation = recipes => {

	  recipes.forEach(recipe);
	  let id = recipe[id];
	  let title = recipe[title];
	  getDescription(id, title);
	  getURL(id, title);
	};

	getDescription = (id, title) => {
	  let description;
	};

	const showRecipes = recipes => {
	  recipes.forEach(recipe => {
	    $('.recipe-top3').append(`<h2>${recipe.title}</h2>`);
	  });
	};

/***/ })
/******/ ]);