//  Import functions
import showMenu from "../utils/showMenu.js";
import hideMenu from "../utils/hideMenu.js";
import showFilters from "../utils/showFilters.js";
import hideFilters from "../utils/hideFilters.js";
import fetchData from "../utils/fetchData.js";
import makeType from "../utils/makeType.js";
import selectDeselectTypeFilter from "../utils/selectDeselectTypeFilter.js";
import refreshCardContainer from "../utils/refreshCardContainer.js";
import makeCard from "../utils/makeCard.js";
import makeCardTypes from "../utils/makeCardTypes.js";
import showPokemon from "./showPokemon.js";

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


//---------------------REGION ACTIVE----------------------


//	Get the active region
const regionActive = document.getElementsByClassName('region__item--active');
//	Store the active region
const region = (regionActive[0].innerText).toLowerCase();


//--------------POKEMON REQUEST BUILD CARDS--------------

//------CREATE CARDS---------

const createCards = (pokemon, htmlElement, pokemonSpecies) => {
	//	Make cards
	const newPokemon = makeCard(pokemon);
	htmlElement.appendChild(newPokemon);
	//	Hear event for each pokemon card created
	newPokemon.addEventListener('click', () => {
		const pokemonSection = showPokemon(pokemon, pokemonSpecies);
		document.body.appendChild(pokemonSection);
	});
	
	//	Make pokemon type and append to the card
	const cardTypes = document.getElementById(`card__${pokemon.name}`);
	const newType = makeCardTypes(pokemon.types, 'card__types');
	cardTypes.appendChild(newType);
	
}

// export default po;
//------


let cardsContainer = document.getElementById('cards-container');

const getPokemonInfo = async (url_api, actualRegion, htmlElement, filteredTypes=null) => {
	try {
		
		//	Container to append cards
		const regions = [];

		//	Get all regions
		const regionsPage1 = await fetchData(`${url_api}pokedex/`);
		const regionsPage2 = await fetchData(`${regionsPage1.next}`);
		
		//	Store all regions
		regionsPage1.results.map( region => {
			regions.push(region);
		})

		regionsPage2.results.map( region => {
			regions.push(region);
		})

		//	Get the actual region object
		let regionPokedex;
		for (const element of regions) {
			if (element.name == actualRegion) {
				regionPokedex = await fetchData(element.url);
			}
		}

		//	Make a card for each Pokemon
		for (const element of regionPokedex.pokemon_entries) {
			const pokemon = await fetchData(element.pokemon_species.url);
			const pokemonInfo = await fetchData(pokemon.varieties[0].pokemon.url);
			// console.log(pokemon);
			// console.log(pokemonInfo);

			//	Variable to avoid duplicated pokemons
			let alreadyFiltered = false;
			//	Filter if filter parameters are sent
			if (filteredTypes) {
				filteredTypes.forEach( element => {
					for (const type of pokemonInfo.types) {

						if (alreadyFiltered) {
							//	Don't duplicate pokemons
						} else {
							if (type.type.name == element) {
								createCards(pokemonInfo, htmlElement, pokemon);
								alreadyFiltered = true;
							}
						}				
					}
				});
			} else {
				createCards(pokemonInfo, htmlElement, pokemon);
			}
		}
		
	} catch (error) {
		console.error(error);
	}
}

//	Show initial pokedex
getPokemonInfo(API, region, cardsContainer);


//------------------------SWITCH POKEDEX-------------------


//	Get the main element to delete the card element
const main = document.getElementById('main');
	
//	Get the region elements
const regionsElement = document.querySelectorAll('.region__item');
//	Hear every element to action the event
regionsElement.forEach( element => {
	element.addEventListener('click', switchRegions);
});

//	Function to build the pokedex according to the actual region
function switchRegions() {
	//	Refresh the card container to stop the last request and add the new cards
	cardsContainer = refreshCardContainer();

	//	Deactivate every region element
	regionsElement.forEach( region => {
		region.classList.remove('region__item--active');
	});
	
	//	Activate the selected region
	this.classList.add('region__item--active');
	
	//	Get the new region name
	const regionActive = document.getElementsByClassName('region__item--active');
	const region = (regionActive[0].innerText).toLowerCase();

	//	Build pokedex according to the active region
	getPokemonInfo(API, region, cardsContainer);
};

