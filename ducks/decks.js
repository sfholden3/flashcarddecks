import * as api from '../utils/api';

export const FETCH_DECKS = 'FETCH_DECKS';
export const FETCH_CURRENT_DECK = 'flascardstudyapp/decks/fetchDeck';
export const SAVE_NEW_DECK = 'SAVE_NEW_DECK';

export default function decks(state = {}, action) {
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...action.fetchedDecks
      };
    case FETCH_CURRENT_DECK:
      return {
        ...state,
        currentDeck: action.payload
      };
    case SAVE_NEW_DECK:
      return {
        ...state,
        ...action.newDeck
      };
    default:
      return state;
  }
}

export function decksFetched(fetchedDecks) {
  console.log('in decksfetched');
  return { type: FETCH_DECKS, fetchedDecks };
}

export function currentDeckFetched(deck) {
  return { type: FETCH_CURRENT_DECK, payload: deck };
}

export function saveNewDeck(newDeck) {
  console.log('in save new deck in ducks');
  return { type: SAVE_NEW_DECK, newDeck };
}
