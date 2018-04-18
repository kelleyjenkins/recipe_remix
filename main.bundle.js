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

	var _users_recipes = __webpack_require__(6);

	__webpack_require__(7);

	(0, _login.signOutListener)();
	(0, _home_view.homeEventListeners)();

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
	  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/users', {
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
	// import {foodKey} from '../environment.js'

	var baseUrl = exports.baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes";

	var getConfig = exports.getConfig = function getConfig() {
	  return {
	    method: "GET",
	    headers: {
	      'Content-Type': 'application/json',
	      'X-Mashape-Key': "" + foodKey
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
	    showAllRecipes(id, title, summary, source, url);
	  });
	};

	var showRecipes = exports.showRecipes = function showRecipes(id, title, summary, source, url) {
	  if ($('ul').length < 3) {
	    $('.recipe-top3').append("<div class=\"recipe-card\"><ul class=\"ul\"><a class=\"recipe_url\" href=\"" + url + "\"><h3 class=\"title\">" + title + "</h3></a><p>" + summary + "</p><p>" + source + "</p><button class=\"save-recipe\" label='save-recipe' type=\"button\" value=\"Save Recipe\">Save Recipe</button></ul></div>");
	  }
	};

	var showAllRecipes = exports.showAllRecipes = function showAllRecipes(id, title, summary, source, url) {
	  $('.recipes').append("<div class=\"recipe-card\"><ul class=\"ul\"><a class=\"recipe_url\"  href=\"" + url + "\"><h3>" + title + "</h3></a><p>" + summary + "</p><p>" + source + "</p><button class=\"save-recipe\" label='save-recipe' type=\"button\" value=\"Save Recipe\">Save Recipe</button></ul></div>");
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleListDelete = handleListDelete;
	exports.findListRecipes = findListRecipes;

	$(window).on('load', function () {
	  loadLists();
	});

	var loadLists = exports.loadLists = function loadLists() {
	  var id = localStorage.getItem('user_id');
	  console.log(id);
	  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/users/' + id + '/lists').then(function (response) {
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
	    $('.user_lists').append('<div class="userlist' + list.id + ' userlist"><h4 class="list' + list.id + '">' + list.name + '</h4><button id = ' + list.id + ' class=\'recipes' + list.id + ' get-recipes\'> Get Recipes</button><button id = ' + list.id + ' class=\'delete' + list.id + ' list-delete\'> Delete</button></div>');
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
	  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/list_ingredients', {
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
	  return fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/lists', {
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
	  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/' + listId, {
	    method: 'Delete'
	  }).then(function (response) {
	    return console.log(response);
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

	function findListRecipes() {
	  var ingredients = $(this).closest(".userlist").find('h6');
	  var ingredients_array = Object.keys(ingredients).map(function (ings) {
	    return ingredients[ings];
	  });
	  var ingarray = [];
	  ingredients_array.forEach(function (ingredient) {
	    ingarray.push(ingredient.innerText);
	  });
	  localStorage.setItem('ingredients', ingarray);
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.homeEventListeners = undefined;

	var _lists = __webpack_require__(3);

	var _ingredients = __webpack_require__(5);

	var _recipe_service = __webpack_require__(2);

	var _users_recipes = __webpack_require__(6);

	var homeEventListeners = exports.homeEventListeners = function homeEventListeners() {

	  $(window).on('load', function () {
	    $('.more-recipes').hide();
	    var ingList = localStorage.getItem('ingredients');
	    (0, _recipe_service.getRecipes)(ingList);
	  });

	  var clicks = 6;
	  $('.add-ingredient').on('click', function () {
	    $('.ingredient-form-inputs').append('<input title=\'ingredient-name\' label=\'ingredient-name\'type=\'text\' data-id="' + clicks + '" class=\'name-input\' placeholder=\'Ingredient\'></br>');
	    clicks++;
	  });

	  $('.ingredient-button').on('click', function () {
	    validateForm(event);
	    $('.more-recipes').show();
	  });

	  $(".profile").on('click', function () {
	    window.location.href = 'http://rigid-downtown.surge.sh/profile.html';
	    return false;
	  });

	  $('.home').on('click', function () {
	    localStorage.removeItem('ingredients');
	    window.location.href = 'http://rigid-downtown.surge.sh/';
	    return false;
	  });

	  $('.more-recipes').on('click', function () {
	    window.location.href = 'http://rigid-downtown.surge.sh/recipes.html';
	  });

	  $('.recipe-top3').on('click', '.save-recipe', function () {
	    _users_recipes.handleSave.call(this);
	  });
	  $('.recipes').on('click', '.save-recipe', function () {
	    _users_recipes.handleSave.call(this);
	  });

	  $('.recipe_lists').on('click', '.recipe-delete', function () {
	    _users_recipes.handleRecipeDelete.call(this);
	  });

	  $('.user_lists').on('click', '.get-recipes', function () {
	    window.location.href = 'http://rigid-downtown.surge.sh/recipes.html';
	    localStorage.removeItem('ingredients');
	    _lists.findListRecipes.call(this);
	  });
	};

	var validateForm = function validateForm(event) {
	  event.preventDefault();
	  if ($('.name-input').val() === "") {
	    alert("You must add at least 1 ingredient");
	  } else (0, _lists.postList)().then(_ingredients.getIngredients);
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getIngredients = exports.postIngredients = undefined;

	var _lists = __webpack_require__(3);

	var _recipe_service = __webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var postIngredients = exports.postIngredients = function postIngredients(ingredientList) {
	  ingredientList.forEach(function (ingredient) {
	    var body = { ingredient: { name: ingredient } };
	    fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/ingredients', {
	      method: 'POST',
	      headers: { 'Accept': 'application/json',
	        'Content-Type': 'application/json' },
	      body: JSON.stringify(body)
	    }).then(function (response) {
	      return response.json();
	    }).then(function (myJson) {
	      var ing_id = myJson.id;
	      (0, _lists.postListIngredients)(ing_id);
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
	  localStorage.setItem('ingredients', ingredientList);
	  (0, _recipe_service.getRecipes)(ingredientList);
	  postIngredients(ingredientList);
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleSave = handleSave;
	exports.handleRecipeDelete = handleRecipeDelete;

	$(window).on('load', function () {
	  loadRecipes();
	});

	// load recipes

	var loadRecipes = exports.loadRecipes = function loadRecipes() {
	  var id = localStorage.getItem('user_id');
	  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/users/' + id + '/recipes').then(function (response) {
	    return response.json();
	  }).then(function (myJson) {
	    var recipes = Object.keys(myJson).map(function (recipe) {
	      return myJson[recipe];
	    });
	    appendRecipes(recipes);
	  });
	};

	var appendRecipes = exports.appendRecipes = function appendRecipes(recipes) {
	  recipes.forEach(function (recipe) {
	    $('.recipe_lists').append('<ul><div class="recipe_list' + recipe.id + '"><a href="' + recipe.url + '"><p class="recipe' + recipe.id + '">' + recipe.name + '</a><button id=' + recipe.id + ' class=\'delete' + recipe.id + ' recipe-delete\'> Delete</button></p></div></ul>');
	  });
	};

	//save recipes

	function handleSave() {
	  var url = $(this).closest(".recipe-card").find('.recipe_url').attr('href');
	  var name = $(this).closest(".recipe-card").find('h3')[0].innerText;
	  var user = localStorage.getItem('user_id');
	  saveRecipe(name, url, user);
	}

	var saveRecipe = exports.saveRecipe = function saveRecipe(name, url, user) {
	  var body = { recipe: { name: name,
	      url: url,
	      user_id: user
	    } };
	  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/recipes', {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

	//delete recipes

	function handleRecipeDelete() {
	  var id = this.id;
	  removeRecipe(id);
	  $('.recipe_list' + this.id).remove();
	}

	var removeRecipe = function removeRecipe(id) {
	  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/' + id, {
	    method: 'Delete'
	  }).then(function (response) {
	    return console.log(response);
	  }).catch(function (error) {
	    return console.error(error);
	  });
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./stylesheet.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./stylesheet.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=IBM+Plex+Serif);", ""]);

	// module
	exports.push([module.id, "body {\n  font-family: 'IBM Plex Serif', serif;\n  height: auto;\n}\n\nhtml {\n  background-image: url('https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');\n  height: auto;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\nbutton {\n    color: black;\n    background-color: #8CB667;\n    border: 2px solid black; /* Green */\n    padding: 10px 10px;\n    margin: 10px;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 14px;\n    border-radius: 4px;\n\n}\n\n.ingredient-button {\n  color: black;\n  background-color: #8CB667;\n  border: 2px solid black; /* Green */\n  padding: 10px 10px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 14px;\n  border-radius: 4px;\n}\n\nh1 {\n  text-align: center;\n  font-size: 28px;\n  color: black;\n}\n\n.topnav {\n    background-color: #8CB667;\n    overflow: hidden;\n}\n\n#google {\n  float: right;\n  padding-top:  7px;\n  padding-right: 7px;\n}\n\n.g-signout2 {\n  float: right;\n}\n\n.topnav a {\n    float: left;\n    color: black;\n    text-align: center;\n    padding: 14px 16px;\n    text-decoration: none;\n    font-size: 20px;\n}\n\n/* Change the color of links on hover */\n.topnav a:hover {\n    color: red;\n}\n\n/* Add a color to the active/current link */\n.topnav a.active {\n    background-color: #8CB667;\n    color: black;\n}\n\n\n.ingredient-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.ingredient-form-inputs {\n  width: 300px;\n}\n\ninput[type=text] {\n    width: 100%;\n    padding: 12px 20px;\n    margin: 8px 0;\n    display: inline-block;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    box-sizing: border-box;\n}\n\n.recipe_lists {\n  width: 500px;\n  border: 1px solid black;\n  border-radius: 10px;\n  background-color: #ffffff;\n  opacity: 0.7;\n  margin: 30px;\n  padding-left:10px;\n}\n\n.recipe-delete {\n  float: right;\n  color: black;\n  background: #8CB667;\n  border: 2px solid #4CAF50; /* Green */\n  padding: 5px 5px;\n  margin: 5px;\n  display: inline-block;\n  font-size: 10px;\n  border-radius: 2px;\n}\n\n.recipe-card {\n  border: 1px solid black;\n  border-radius: 10px;\n  background-color: #ffffff;\n  opacity: 0.7;\n  padding-right: 30px;\n  margin: 30px;\n}\n.user_lists {\n  display: flex;\n}\n.userlist {\n  width: 200px;\n  text-align: center;\n  border: 1px solid black;\n  border-radius: 10px;\n  background-color: #ffffff;\n  opacity: 0.7;\n  margin: 30px;\n}\n", ""]);

	// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);