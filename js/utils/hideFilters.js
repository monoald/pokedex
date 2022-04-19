//  Function to hide the filers and show the regions section when cliking th filter icon

//  Get elements
const filterSection = document.getElementById('filter-section');
const regionsSection = document.getElementById('regions');
const filterIcon = document.getElementById('filter-icon');
const mainFilter = document.getElementById('main-filter');

const hideFIlters = () => {
    filterSection.setAttribute('class', 'filter');
    filterIcon.setAttribute('class', 'main__icon icon');
    mainFilter.setAttribute('class', 'main__filter')
    
    if (regionsSection != null) {
        regionsSection.setAttribute('class', 'main__regions');
    }
}

//  Export function
export default hideFIlters;