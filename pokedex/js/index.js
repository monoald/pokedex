//  Import functions
import showMenu from "../utils/showMenu.js";
import hideMenu from "../utils/hideMenu.js";
import showFilters from "../utils/showFilters.js";
import hideFilters from "../utils/hideFilters.js";
import fetchData from "../utils/fetchData.js";
import makeType from "../utils/makeType.js";
import makeCard from "../utils/makeCard.js";
import makeCardTypes from "../utils/makeCardTypes.js";

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


//----------------------REQUEST------------------------


//  Get type container to append new types on it
const typesContainer = document.getElementById('type-container');

const getTypes = async (url_api) => {
	try {

		const types = await fetchData(`${url_api}type/`);

		//  Append types for filters
		types.results.map( type => {
			const newType = makeType(type.name);
			typesContainer.appendChild(newType)
		} );

	} catch (error) {
			console.error(error);
	}
};
getTypes(API);

//	Push new elements to an array
const pushElement = (array, pokemons) => {
	array.map( pokemon => {
		pokemons.push(pokemon)
	})
}

const actualRegion = ['national', '1'];

//	Container to append cards
const cardsContainer = document.getElementById('cards-container');

const getPokemonInfo = async (url_api) => {
	try {
		
		const regions = [];

		//	Get all regions
		const regionsPage1 = await fetchData(`${url_api}pokedex/`)
		const regionsPage2 = await fetchData(`${regionsPage1.next}`)
		
		//	Store all regions
		regionsPage1.results.map( region => {
			regions.push(region);
		})

		regionsPage2.results.map( region => {
			regions.push(region);
		})

		//	Get region pokedex
		const regionPokedex = await fetchData(regions[0].url);
		
		//	Make a card for each Pokemon
		for (const element of regionPokedex.pokemon_entries) {
			const pokemon = await fetchData(element.pokemon_species.url);
			const pokemonInfo = await fetchData(pokemon.varieties[0].pokemon.url);
			
			//	Make cards
			const newPokemon = makeCard(pokemonInfo);
			cardsContainer.appendChild(newPokemon);

			//	Make pokemon type and append to the card
			const cardTypes = document.getElementById(`card__${pokemonInfo.name}`);
			const newType = makeCardTypes(pokemonInfo.types);
			cardTypes.appendChild(newType);
		}
		
	} catch (error) {
		console.error(error);
	}
}

getPokemonInfo(API);