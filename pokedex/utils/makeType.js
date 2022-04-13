
//  Create a type for the filter

const makeType = (type) => {
    const newType = document.createElement('p');

    newType.innerHTML = type;

    newType.classList.add('type')
    newType.classList.add(`type--${type}`);

    return newType
}

//  Export function
export default makeType;