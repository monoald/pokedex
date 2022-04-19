// Function to back to main and close pokemon info

const main = document.getElementById('main');
const closeInfo = document.getElementById('close-info');

async function backToMain() {
  const pokemonSection = document.getElementById('pokemon');
  main.setAttribute('class', 'main');
  
  closeInfo.classList.add('pokemon__close-icon');
  closeInfo.classList.remove('pokemon__close-icon--active');
  
  pokemonSection.remove();
  
}

export default backToMain;