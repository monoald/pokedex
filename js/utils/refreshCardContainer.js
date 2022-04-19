//  Function to stop the last request and clean the card contanier
const main = document.getElementById('main');
let cardsContainer = document.getElementById('cards-container');

const refreshCardContainer = () => {
  //	Remove element to stop previous request and clear cards
  cardsContainer.remove();
  
  //	Re-Creating the card container element for the new pokedex
  cardsContainer = document.createElement('section');
  cardsContainer.classList.add('main__cards');
  cardsContainer.setAttribute('id', 'cards-container');
  main.appendChild(cardsContainer);

  return cardsContainer;
}

export default refreshCardContainer;