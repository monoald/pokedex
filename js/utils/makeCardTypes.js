//  Create the types of the pokemon 

const makeCardTypes = (types, className) => {
  const newType = document.createElement('div');

  newType.classList.add(className);

  for (const type of types) {

    newType.innerHTML += `
    <span class="type type--${type.type.name}">${type.type.name}</span>
    `;
  }

  return newType
}

//  Export function
export default makeCardTypes;