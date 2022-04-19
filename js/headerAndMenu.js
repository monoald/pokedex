//--------------=---IMPORT FUNCTIONS------------------
import showMenu from "/js/utils/showMenu.js";
import hideMenu from "/js/utils/hideMenu.js";
import showFilters from "/js/utils/showFilters.js";
import hideFilters from "/js/utils/hideFilters.js";
import fetchData from "/js/utils/fetchData.js"
import makeType from "/js/utils/makeType.js";
import selectDeselectTypeFilter from "/js/utils/selectDeselectTypeFilter.js";

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


//------------------TYPES REQUEST------------------------


//  Get type container to append new types on it and filter by type
const typesContainer = document.getElementById('type-container');

const getTypes = async (url_api) => {
	try {
		
		const types = await fetchData(`${url_api}type/`);
		
		//  Append types for filters
		types.results.map( type => {
			const newType = makeType(type.name);
			typesContainer.appendChild(newType)
		} );

		//	Get the created types elements
		const filterType = document.querySelectorAll('.type');
		//	Hear a event on each element to action
		filterType.forEach( element => {
			element.addEventListener('click', selectDeselectTypeFilter);
		})
		
		//	Get elements
		const filterButton = document.getElementById('filter-button');
		const filterSection = document.getElementById('filter-to-apply');
		//	Hear event to action
		filterButton.addEventListener('click', filterPokemons);

		//	Add filters
		function filterPokemons() {			
			
			//	Get and store selected filters
			let typesToFilter = [];
			for (const type of filterSection.children) {
				typesToFilter.push(type.innerHTML)
			}

			//	Get actual region
			let activeRegion = document.getElementsByClassName('region__item--active');
			activeRegion = (activeRegion[0].innerText).trim().toLowerCase();
			
			//	Refresh the card container to stop the last request and add the new cards
			cardsContainer = refreshCardContainer();
			//	Show the filtered pokemons
			getPokemonInfo(API, activeRegion, cardsContainer,typesToFilter);
		};


	} catch (error) {
		console.error(error);
	}
};
getTypes(API);