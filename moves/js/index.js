import fetchData from "/js/utils/fetchData.js";
import makeMoveCard from "/js/utils/makeMoveCard.js";
import makeType from "/js/utils/makeType.js";
import selectDeselectTypeFilter from "/js/utils/selectDeselectTypeFilter.js";
import refreshMoveContainer from "/js/utils/refreshMoveContainer.js";
import showFilters from "/js/utils/showFilters.js";

//  Pokemon API
const API = 'https://pokeapi.co/api/v2/';

//--------------------SHOW FILTERS--------------------





//------------------TYPES REQUEST------------------------


//  Get type container to append new types on it and filter by type
const typesContainer = document.getElementById('type-container');
let main = document.getElementById('main');

const getTypes = async (url_api) => {
	try {
		
		const types = await fetchData(`${url_api}type/`);

		
		//  Append types for filters
		types.results.map( type => {
			const newType = makeType(type.name);
			typesContainer.appendChild(newType)
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
				typesToFilter.push(type.innerHTML)
			}
			
			//	Refresh the card container to stop the last request and add the new cards
      main = refreshMoveContainer();
      document.body.appendChild(main);

      showMoves(API, typesToFilter);

		}
    // const filterIcon = document.getElementById('filter-icon');
    // //  Hear the event to action
    // filterIcon.addEventListener('click', showFilters);

    //  Get the filter icon element 


	} catch (error) {
		console.error(error);
	}
};
getTypes(API);


//------------------
//  Get main container to append move cards
let movesContainer = document.getElementById('cards-container');

const showMoves = async (url_api, filteredTypes = null) => {
  try {
    movesContainer = document.getElementById('cards-container');
    const moves = [];

    let data = await fetchData(`${url_api}move/`);
  
    while (data.next != null) {
      for (const move of data.results) {

        const moveInfo = await fetchData(`${move.url}`);

        // moves.push(moveInfo)

        if (filteredTypes) {
          filteredTypes.forEach( element => {

            if (element == moveInfo.type.name) {
              console.log(element);
              const newCard = makeMoveCard(moveInfo);
              movesContainer.appendChild(newCard);
            }
          });
        } else {
          const newCard = makeMoveCard(moveInfo);
          movesContainer.appendChild(newCard);  
        }
  
      }
      data = await fetchData(data.next);
    } 

    // for (const move of moves) {
    //   const newCard = makeMoveCard(move);
    //   movesContainer.appendChild(newCard);  
    // }
    // console.log(moves);
  } catch (error) {
    console.error(error);
  }

}

showMoves(API);

