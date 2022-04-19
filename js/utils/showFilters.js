//  Function to show the filers and hide the regions section when cliking th filter icon

//  Get elements of the sections
const filterSection = document.getElementById('filter-section');
const regionsSection = document.getElementById('regions');
const filterIcon = document.getElementById('filter-icon');
const mainFilter = document.getElementById('main-filter');

const showFilters = () => {
    filterSection.setAttribute('class', 'filter--active');
    filterIcon.setAttribute('class', 'main__icon--inactive');
    mainFilter.setAttribute('class', 'main__filter--inactive');
    
    if (regionsSection != null) {
        regionsSection.setAttribute('class', 'main__regions--inactive');
        
    }
}

//  Export function
export default showFilters;