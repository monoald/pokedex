//  Function to create a move card

function makeMoveCard(move) {
  const card = document.createElement('div');
  card.classList.add('move');
  card.setAttribute('id', 'move');

  card.innerHTML = `
  <div class="move__general">

    <h3 class="move__name">${move.name}</h3>
    
    <div class="move__types">
      <span class="type type--${move.type.name}">${(move.type.name)}</span>
    </div>

  </div>

  <div class="move__info">
    
    <div class="move__item">
      <h3 class="item__name">Accuracy</h3>
      <span class="item__value">${ (move.accuracy == null) ? '--': move.accuracy }</span>
    </div>

    <div class="move__item">
      <h3 class="item__name">Power</h3>
      <span class="item__value">${ (move.power == null) ? '--': move.power}</span>
    </div>

    <div class="move__item">
      <h3 class="item__name">PP</h3>
      <span class="item__value">${move.pp}</span>
    </div>

  </div>
  `
  
  return card;
}

//  Export function
export default makeMoveCard;