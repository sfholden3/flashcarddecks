import * as api from '../utils/api';

export const FETCH_DECKS = 'FETCH_DECKS';

export default function decks(state = {}, action) {
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...action.fetchedDecks
      };
    default:
      return state;
  }
}

export function decksFetched(fetchedDecks) {
  console.log('in decksfetched');
  return { type: FETCH_DECKS, fetchedDecks };
}
