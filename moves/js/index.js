import makeMoveCard from "/js/utils/makeMoveCard.js";
import makeType from "/js/utils/makeType.js";
import selectDeselectTypeFilter from "/js/utils/selectDeselectTypeFilter.js";
import showMoveInfo from "./showMoveInfo.js";

//  Pokemon API
const API = 'https://pokeapi.co/api/v2/';


//----------------INITIALIZE ABORT VARIABLES--------------


let controllerGlobal = new AbortController();
let signalGlobal = controllerGlobal.signal;


//------------------TYPES REQUEST------------------------


//  Get type container to append new types on it and filter by type
const typesContainer = document.getElementById('type-container');
let main = document.getElementById('main');

const getTypes = async (url_api) => {
	try {
		
		const types = await fetch(`${url_api}type/`).then((res) => res.json());

		
		//  Append types for filters
		types.results.map( type => {
      if (type.name != 'unknown' && type.name != 'shadow') {
        const newType = makeType(type.name);
        typesContainer.appendChild(newType)
      }
		} );

		//	Get the created types elements
		const filterType = document.querySelectorAll('.type');
		//	Hear a event on each element to action
		filterType.forEach( element => {
			element.addEventListener('click', selectDeselectTypeFilter);
		})
		
		//	Get elements
		const filterButton = document.getElementById('filter-button');
		const filterSection = document.getElementById('filter-to-apply');
		//	Hear event to action
		filterButton.addEventListener('click', filterMoves);

		//	Add filters
		function filterMoves() {			
			
			//	Get and store selected filters
			let typesToFilter = [];
			for (const type of filterSection.children) {
				typesToFilter.push(type.innerHTML);
			}
			//  Abort previous request
      controllerGlobal.abort();
      console.log('Download aborted');
      movesContainer.innerHTML = '';
      
      // Re-set abort values
      controllerGlobal = new AbortController;
			signalGlobal = controllerGlobal.signal;

      showMoves(API, typesToFilter, signalGlobal);
		}


	} catch (error) {
		console.error(error);
	}
};
getTypes(API);


//--------------ITEM REQUEST BUILD CARDS--------------

function createCards(info) {
  const newCard = makeMoveCard(info);
  movesContainer.appendChild(newCard);
  
  //	Hear event for each move card created
  newCard.addEventListener('click', () => {
    const infoSection = showMoveInfo(info);
    document.body.appendChild(infoSection);
  });
}


//  Get main container to append move cards
let movesContainer = document.getElementById('cards-container');

//  Get and show each move
const showMoves = async (url_api, filteredTypes = null, signal=null) => {
  try {
    movesContainer = document.getElementById('cards-container');
    const moves = [];

    let data = await fetch(`${url_api}move/`, {signal}).then((res) => res.json()).catch((e) => console.error(e));
  
    while (data.next != null) {
      for (const move of data.results) {
        console.log('Hola BB');

        const moveInfo = await fetch(`${move.url}`, {signal}).then((res) => res.json()).catch((e) => console.error(e));

        if (filteredTypes) {
          filteredTypes.forEach( element => {

            if (element == moveInfo.type.name) {
              createCards(moveInfo);
            }
          });
        } else {
          createCards(moveInfo);
        }
  
      }
      data = await fetch(data.next).then((res) => res.json());
    } 

  } catch (error) {
    console.error(error);
  }

}

showMoves(API, null, signalGlobal);

