

function showAndHideFilters() {
    
    if (filterSection.className == 'filter'){
        filterSection.setAttribute('class', 'filter--active');
    } else {
        filterSection.setAttribute('class', 'filter')
    }
}

export default showAndHideFilters;