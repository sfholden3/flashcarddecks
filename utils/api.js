import { AsyncStorage } from 'react-native';
import { formatDecksResults, formatandSelectCurrentDeck, DECK_STORAGE_KEY } from './helpers';

export function getDecks() {
  try {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecksResults);
  } catch (err) {
    console.log('error in api/getDecks: ' + err);
  }
}

//getDeck: take in a single id argument and return the deck associated with that id.
export function getCurrentDeck(deckTitle) {
  try {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => formatandSelectCurrentDeck(results, deckTitle));
  } catch (err) {
    console.log('error in api/getCurrentDeck: ' + err);
  }
}

//saveDeckTitle: take in a single title argument and add it to the decks.

export function saveDeckTitle(newDeckTitle) {
  console.log('save deck title! ');
  console.log(newDeckTitle);
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [newDeckTitle]: {
        title: newDeckTitle,
        questions: []
      }
    })
  ).then(() => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecksResults);
  });
}

//addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(deckTitle, question) {
  console.log('Add card to Deck ');
  console.log(deckTitle);
  console.log('New Question:');
  console.log(question);
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    console.log('data: ');
    console.log(data);
    const thisDeck = data[deckTitle];
    console.log('this deck: ');
    console.log(thisDeck);
    const questions = thisDeck['questions'];
    console.log("questions");
    console.log(questions);
    questions.push(question);
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data)).then(() => {
      return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecksResults);
    });
  });
}
/*export async function addCardToDeck(deckTitle, question) {
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
}*/

/*export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  });
}*/
