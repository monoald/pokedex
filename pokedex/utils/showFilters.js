//  Function to show the filers and hide the regions section when cliking th filter icon

//  Get elements of the sections
const filterSection = document.getElementById('filter-section');
const regionsSection = document.getElementById('regions');
const filterIcon = document.getElementById('filter-icon');

const showFilters = () => {
    filterSection.setAttribute('class', 'filter--active');
    regionsSection.setAttribute('class', 'main__regions--inactive');
    filterIcon.setAttribute('class', 'main__icon--inactive')
}

//  Export function
export default showFilters;