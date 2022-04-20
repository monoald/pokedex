import makeCard from "../../js/utils/makeCard.js";
import makeCardTypes from "../../js/utils/makeCardTypes.js";
import showPokemon from "../../pokedex/js/showPokemon.js";

//  Function to show move info

const main = document.getElementById('main');
const closeInfo = document.getElementById('close-info');

function showMove(move) {
  //  Go to the start of the page
  window.scroll( {top: 0, left: 0, behavior: 'smooth' } );

  // console.log(move);
  //  Hide the main section
  main.setAttribute('class', 'main--inactive');

  //--------------------Create and write item info section--------------------
  const moveSection = document.createElement('section');
  moveSection.classList.add('move-info');
  moveSection.setAttribute('id', 'move');

  //  Write HTML code
  moveSection.innerHTML = `
    <h2 class="move-info__name">${move.name}</h2>

    <div class="move-info__types">
      <span class="type type--${move.type.name}">${move.type.name}</span>
    </div>

    <div class="move-info__item">
      <h3 class="move-info__title">Accuracy</h3>
      <span class="move-info__value">${ (move.accuracy == null) ? '--': move.accuracy }</span>
    </div>

    <div class="move-info__item">
      <h3 class="move-info__title">Power</h3>
      <span class="move-info__value">${ (move.power == null) ? '--': move.power}</span>
    </div>

    <div class="move-info__item">
      <h3 class="move-info__title">PP</h3>
      <span class="item__value">${move.pp}</span>
    </div>

    <div class="move-info__item">
      <h3 class="move-info__title">Damage Class</h3>
      <span class="item__value">${move.damage_class.name}</span>
    </div>
  `;

  //--------------------Append english move description------------------------
  for (const description of move.flavor_text_entries) {
    if (description.language.name == 'en') {
      moveSection.innerHTML += `
      <div class="move-info__flavor">
        <p class="move-info__description">${description.flavor_text}</p>
      </div>
      `;
      break;
    }
  }
  
  //-----------Get and print every pokemon that can learn this move------------
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('move-info__cards-container');
  //  Add title card section
  cardsContainer.innerHTML += `
  <h3 class="move-info__subtitle">Learned by Pokemon</h3>
  `;

  const getPokemon = async () => {
    for (const pokemon of move.learned_by_pokemon) {
      
      const pokemonInfo = await fetch(`${pokemon.url}`).then((res) => res.json());
      
      const pokemonCard = makeCard(pokemonInfo);
      const cardType = makeCardTypes(pokemonInfo.types, 'card__types');
      //  Append card
      pokemonCard.appendChild(cardType);
      cardsContainer.appendChild(pokemonCard);
      //  Hear event to open Pokemon Card
      pokemonCard.addEventListener('click', async () => {
        moveSection.remove();
        const pokemonSpecies = await fetch(`${pokemonInfo.species.url}`).then((res) => res.json());
        const pokemonSection = showPokemon(pokemonInfo, pokemonSpecies)
        document.body.appendChild(pokemonSection);
      })
    }
  };
  getPokemon();

  //  Show close move-info section icon
  closeInfo.setAttribute('class','pokemon__close-icon--active');
  //  Hear event to close the section adn back to main
  closeInfo.addEventListener('click', () => {
    moveSection.remove();

    main.setAttribute('class', 'main');
    closeInfo.setAttribute('class','pokemon__close-icon');
  });

  moveSection.appendChild(cardsContainer);


  //---------------------Event to open pokemon----------------------

  
  return moveSection;
}

//  Export function
export default showMove;
