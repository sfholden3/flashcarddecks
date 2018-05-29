import * as api from '../utils/api';

export const FETCH_CURRENT_DECK = 'FETCH_CURRENT_DECK';

export default function currentDeck(state = {}, action) {
  switch (action.type) {
    case FETCH_CURRENT_DECK:
      return {
        ...action.deck
      };
    default:
      return state;
  }
}

export function currentDeckFetched(deck) {
  console.log('in current deck fetch');
  return { type: FETCH_CURRENT_DECK, deck };
}

