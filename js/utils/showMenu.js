//  Function to show the menu bar

//  Get element of the menu section
const menu = document.getElementById('menu');

const showMenu = () => {
    menu.setAttribute('class', 'menu__container--active');
}

//  Export function
export default showMenu;