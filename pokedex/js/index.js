//--------------=---IMPORT FUNCTIONS------------------
import fetchData from "/js/utils/fetchData.js";
import refreshCardContainer from "/js/utils/refreshCardContainer.js";
import makeCard from "/js/utils/makeCard.js";
import makeCardTypes from "/js/utils/makeCardTypes.js";
import showPokemon from "./showPokemon.js";

//  Pokemon API
const API = 'https://pokeapi.co/api/v2/';


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

