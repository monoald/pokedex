//  Function to refresh moves container

let main = document.getElementById('main');

function refreshMoveContainer() {
  
  main.remove();
  main = document.createElement('main');
  main.classList.add('main');
  main.setAttribute('id', 'main');

  main.innerHTML = `
  <div class="main__filter" id="main-filter">
    <figure class="main__icon icon" id="filter-icon">
      <img class="image" src="/img/icons/filter.png" alt="filter">
    </figure>
  </div>

  <section class="filter" id="filter-section">

    <div class="filter__back">
      <figure class="filter__icon icon" id="back-icon">
        <img class="image" src="/img/icons/back.png" alt="return">
      </figure>
    </div>

    <div class="filter__to-apply" id="filter-to-apply">
      
    </div>

    <div class="filter__types" id="type-container">
      <h2 class="filter__title">Type</h2>
    </div>

    <div class="filter__action">
      <button class="filter__button" id="filter-button">Filter</button>
    </div>
  </section>

  <section class="main__cards" id="cards-container">

    </section>
  `

  return main;
}

//  Export function
export default refreshMoveContainer;