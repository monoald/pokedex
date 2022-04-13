//  Function to hide the menu bar

//  Get element of the menu section
const menu = document.getElementById('menu');

const hideMenu = () => {
    menu.setAttribute('class', 'header__nav-bar');
}

//  Export function
export default hideMenu;