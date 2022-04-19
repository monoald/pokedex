//  Function to hide the menu bar

//  Get element of the menu section
const menu = document.getElementById('menu');

const hideMenu = () => {
    menu.setAttribute('class', 'menu__container');
}

//  Export function
export default hideMenu;