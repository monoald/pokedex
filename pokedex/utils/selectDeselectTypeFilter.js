//  Function to move selected types between the types to select 
//  and the types to filter

//  Get the html elements
const typesContainer = document.getElementById('type-container');
const filterSection = document.getElementById('filter-to-apply');

function selectDeselectTypeFilter() {  
  (this.parentNode.classList.value == 'filter__types')
  ? filterSection.appendChild(this)
  : typesContainer.appendChild(this);
}

//  Export function
export default selectDeselectTypeFilter;