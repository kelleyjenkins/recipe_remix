import {onSignIn, signOutListener} from './login.js';

import {getRecipes, getInformation, getDescription, getURL, showRecipes, baseUrl, getConfig, showAllRecipes} from './recipe_service.js'

import {loadLists, loadList, loadListIngredients, postListIngredients, postList, handleListDelete, removeList} from './lists.js'

import {homeEventListeners} from './home_view.js'

import {postIngredients, getIngredients} from './ingredients.js'

import {loadRecipes, appendRecipes, handleRecipeDelete} from './users_recipes.js'

import '../stylesheet.css'


signOutListener()
homeEventListeners()

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname));
app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/scripts'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// add other routes below
app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname + 'profile.html'));
});
app.get('/recipes', function (req, res) {
  res.sendFile(path.join(__dirname + 'recipes.html'));
});

app.listen(process.env.PORT || 8080);
