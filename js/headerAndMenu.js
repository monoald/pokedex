//--------------=---IMPORT FUNCTIONS------------------
import showMenu from "./utils/showMenu.js";

import hideMenu from "./utils/hideMenu.js";
import showFilters from "./utils/showFilters.js";
import hideFilters from "./utils/hideFilters.js";
//  Pokemon API
const API = 'https://pokeapi.co/api/v2/';

//---------------------SHOW MENU----------------------


//  Get menu icon element
const menuIcon = document.getElementById('menu-icon');
//  Hear the event to action
menuIcon.addEventListener('click', showMenu);


//----------------------HIDE MENU----------------------


//  Get menu close icon
const menuClose = document.getElementById('menu-close');
//  Hear the event to action
menuClose.addEventListener('click', hideMenu);


//--------------------SHOW FILTERS--------------------


//  Get the filter icon element 
const filterIcon = document.getElementById('filter-icon');
//  Hear the event to action
filterIcon.addEventListener('click', showFilters);


//-------------------HIDE FILTERS------------------------


//  Get the back icon
const backIcon = document.getElementById('back-icon');
//  Hear the event to action
backIcon.addEventListener('click', hideFilters);


