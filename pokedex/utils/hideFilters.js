//  Function to hide the filers and show the regions section when cliking th filter icon

//  Get elements
const filterSection = document.getElementById('filter-section');
const regionsSection = document.getElementById('regions');
const filterIcon = document.getElementById('filter-icon');

const hideFIlters = () => {
    filterSection.setAttribute('class', 'filter');
    regionsSection.setAttribute('class', 'main__regions');
    filterIcon.setAttribute('class', 'main__icon icon');
}

//  Export function
export default hideFIlters;