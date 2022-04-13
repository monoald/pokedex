import showAndHideFilters from './module'

const filterButton = document.getElementById('filter-icon');
const filterSection = document.getElementById('filter-section');

filterButton.addEventListener('click', showAndHideFilters);