//  Function to hide main section and show Pokemon info

import fetchData from "../utils/fetchData.js";
import makeCardTypes from "../utils/makeCardTypes.js";
import backToMain from "../utils/backToMain.js";

const main = document.getElementById('main');
const closeInfo = document.getElementById('close-info');

function showPokemon(pokemon, pokemonSpecies) {
  //  Go to the start of the page
  window.scroll( {top: 0, left: 0, behavior: 'smooth' } );

  //  Hide main section
  main.setAttribute('class', 'main--inactive');
  
  // console.log(pokemon);
  // console.log(pokemonSpecies);
  //  Build the Pokemon section
  const pokemonSection = document.createElement('section');
  pokemonSection.classList.add('pokemon');
  pokemonSection.setAttribute('id', 'pokemon')
  pokemonSection.innerHTML = `
    <h2 class="pokemon__name">${pokemon.name}</h2>
  `
  //  Append each type of the pokemon
  const pokemonTypes = makeCardTypes(pokemon.types, 'types-container');


  pokemonSection.appendChild(pokemonTypes);

  //  Build the rest of the page
  pokemonSection.innerHTML += `
    <figure class="main__image">
      <img class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Pokemon Image">
    </figure>

    <section class="description">
      <p class="description__text">${(pokemonSpecies.flavor_text_entries[0].flavor_text).replace('', ' ')}</p>
    </section>

    <section class="info">

      <h3 class="info__title">Stats</h3>

      <div class="info__item">
        <h4 class="info__name">HP</h4>
        <span class="info__value">${pokemon.stats[0].base_stat}</span>
      </div>

      <div class="info__item">
        <h4 class="info__name">Attack</h4>
        <span class="info__value">${pokemon.stats[1].base_stat}</span>
      </div>
      
      <div class="info__item">
      <h4 class="info__name">Special-Attack</h4>
      <span class="info__value">${pokemon.stats[3].base_stat}</span>
      </div>
      
      <div class="info__item">
      <h4 class="info__name">Special-Defense</h4>
      <span class="info__value">${pokemon.stats[4].base_stat}</span>
      </div>
      
      <div class="info__item">
        <h4 class="info__name">Defense</h4>
        <span class="info__value">${pokemon.stats[2].base_stat}</span>
      </div>

      <div class="info__item">
        <h4 class="info__name">Speed</h4>
        <span class="info__value">${pokemon.stats[5].base_stat}</span>
      </div>
    </section>

    <section class="info">
  `
  
  
  
  //  Append each abilitty of the pokemon
  const newAbility = document.createElement('section');
  
  newAbility.classList.add('info');
  
  newAbility.innerHTML = `<h3 class="info__title">Abilities</h3>`
  
  pokemon.abilities.forEach(async ability => {
    const abilitiesInfo = await fetchData(ability.ability.url);
    
    newAbility.innerHTML += `
    <div class="info__item">
    <h3 class="info__name">${ability.ability.name}</h3>
    <span class="info__value">${abilitiesInfo.flavor_text_entries[0].flavor_text}</span>
    </div>
    `;
    
  });
  
  pokemonSection.appendChild(newAbility);
  
  //  Build evolutions section
  const evolutionSection = document.createElement('section');
  evolutionSection.classList.add('evolution');
  evolutionSection.innerHTML = `
    <h2 class="evolution__title">Evolutions</h2>
  `

  //  Build evolution div
  const evolutionDiv = document.createElement('div');
  evolutionDiv.classList.add('evolution__cards-container');

  //  Append each pokemon evolution
  const getEvolutions = async () => {
    const evolutionChain = await fetchData(pokemonSpecies.evolution_chain.url);
    
    let stage = evolutionChain.chain; 
    let actualPokemon = stage.species;
    
    let actualPokemonSpecies = await fetchData(actualPokemon.url);
    let actualPokemonInfo = await fetchData(actualPokemonSpecies.varieties[0].pokemon.url)
    
    //  Make card
    let evolutionCard = makeCard(actualPokemonInfo, stage, actualPokemonSpecies);
    
    evolutionDiv.appendChild(evolutionCard);
    
    //  Make card for each linear evolution
    if ( (stage.evolves_to).length == 1 ) {
      
      while (stage.evolves_to[0] !== undefined) {
        stage = stage.evolves_to[0];
        actualPokemon = stage.species;
        
        actualPokemonSpecies = await fetchData(actualPokemon.url);
        actualPokemonInfo = await fetchData(actualPokemonSpecies.varieties[0].pokemon.url)
        
        evolutionCard = makeCard(actualPokemonInfo, stage, actualPokemonSpecies);
        evolutionDiv.appendChild(evolutionCard);
      }
    } else if ( (stage.evolves_to).length > 1 ) {
      //  Make card for each multiple evolution base pokemon
      stage.evolves_to.forEach( async evolution => {    
        console.log(evolution);    
        actualPokemonSpecies = await fetchData(evolution.species.url);
        actualPokemonInfo = await fetchData(actualPokemonSpecies.varieties[0].pokemon.url)
        
        evolutionCard = makeCard(actualPokemonInfo, evolution, actualPokemonSpecies);
        evolutionDiv.appendChild(evolutionCard);
      });
    }
  }

  evolutionSection.appendChild(evolutionDiv);
  pokemonSection.appendChild(evolutionSection);
  getEvolutions(); 
  
  return pokemonSection;
}

//  Export function
export default showPokemon;



//  Function to build the evolution card
function makeCard(pokemon, stage, pokemonSpecies) {
  //  Build card div
  const evolutionCard = document.createElement('div');
  evolutionCard.classList.add('evolution__card');
  evolutionCard.classList.add('card');

  evolutionCard.innerHTML = `
    <figure class="card__image">
      <img class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Base Pokemon">
    </figure>

    <h2 class="card__title">${pokemon.name}</h2>
  `
  if (stage.is_baby) {
    evolutionCard.innerHTML +=  `<span class="card__evolution-level">Baby Form</span>`
  } else if ( (stage.evolution_details).length == 0 ) {
    evolutionCard.innerHTML += `<span class="card__evolution-level">Base Pokemon</span>`
  } else if ( stage.evolution_details[0].min_level == null) {
    evolutionCard.innerHTML += `<span class="card__evolution-level">Stone Evolution</span>`
  }
  else {
    evolutionCard.innerHTML += `<span class="card__evolution-level">Lvl. ${stage.evolution_details[0].min_level}</span>`
  }

  const cardTypes = makeCardTypes(pokemon.types);
  evolutionCard.appendChild(cardTypes);


  //  Show close-icon 
  closeInfo.classList.remove('pokemon__close-icon');
  closeInfo.classList.add('pokemon__close-icon--active');
  closeInfo.addEventListener('click', backToMain);

  evolutionCard.addEventListener('click', () => { 
    let pokemonSection = document.getElementById('pokemon');
    pokemonSection.remove();

    pokemonSection = showPokemon(pokemon, pokemonSpecies);
		document.body.appendChild(pokemonSection);
  });

  return evolutionCard;
}