//  Import functions
import showMenu from "../utils/showMenu.js";
import hideMenu from "../utils/hideMenu.js";
import showFilters from "../utils/showFilters.js";
import hideFilters from "../utils/hideFilters.js";
import fetchData from "../utils/fetchData.js";
import makeType from "../utils/makeType.js";

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


//----------------------GET TYPES------------------------

//  Get type container to append new types on it
const typesContainer = document.getElementById('type-container');

const makeRequest = async (url_api) => {
    try {
        const types = await fetchData(`${url_api}type/`);
        const data = await fetchData(`https://pokeapi.co/api/v2/pokemon-form/1/`);

        console.log(data);
        

        //  Append types for filters
        types.results.map( type => {
            const newType = makeType(type.name);
            typesContainer.appendChild(newType)
        } );
    } catch (error) {
        console.error(error);
    }
}

makeRequest(API);