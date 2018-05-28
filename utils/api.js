import { AsyncStorage } from 'react-native';
import { formatDecksResults, DECK_STORAGE_KEY } from './helpers';

export function getDecks() {
  try {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecksResults);
  } catch (err) {
    console.log('error in api/getDecks: ' + err);
  }
}

//getDeck: take in a single id argument and return the deck associated with that id.
/*export function getDeck(deckTitle) {
  try {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecksResults);
  } catch (err) {
    console.log('error in api/getDecks: ' + err);
  }
  console.log("you've hit getdeck");
  console.log('deck to get: ' + deckTitle);
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results === null
      ? { title: 'no decks' }
      : JSON.parse(results)[deckTitle] === null
        ? { title: 'no deck with that title' }
        : JSON.parse(results)[deckTitle];
  });
}*/

//saveDeckTitle: take in a single title argument and add it to the decks.

export function saveDeckTitle(newDeckTitle) {
  console.log('save deck title! ');
  console.log(newDeckTitle);
  try {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
      console.log("we're in the then!");
      console.log("these are the results: "+results)
      const newDeck = {
            [newDeckTitle]: {
              title: newDeckTitle,
              questions: []
            }
          };
      try {
        console.log("results with newDeck"+results != newDeck);
      return AsyncStorage.setItem(
          DECK_STORAGE_KEY, JSON.stringify(
          results
        ).then(() => {
          console.log("we're in the result of setting the new title");
          return JSON.parse(JSON.stringify(newDeck));
        }));
        console.log("we've set the new deck: "+results);
      } catch (err) {
        console.log('error setting new deck: ' + err);
      }
    });
  } catch (error) {
    console.log('ERROR in api/saveDeckTitle getting item: ' + error);
  }
}

//addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

export async function addCardToDeck(deckTitle, question) {
  await AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    if (results !== null) {
      const decksObj = JSON.parse(results);
      if (decksObj[deckTitle] != null) {
        console.log('deck: ' + decksObj[deckTitle]);
        console.log('questions: ' + decksObj[deckTitle].questions);
        decksObj[deckTitle].questions.push(question);
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decksObj));
      }
    }
  });
}

/*export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}*/
