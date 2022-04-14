//  Create a card with the API Specifications

const makeCard = (pokemon) => {
  const newPokemon = document.createElement('div');

  newPokemon.classList.add('card');
  newPokemon.setAttribute('id', `card__${pokemon.name}`);

  newPokemon.innerHTML = `
  <figure class="card__image">
    <img class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name} image">
  </figure>

  <div class="card__description">
    <span class="card__number"># ${pokemon.id}</span>

    <h3 class="card__name">${pokemon.name}</h3>
  </div>

  `;

  return newPokemon;
}

export default makeCard;