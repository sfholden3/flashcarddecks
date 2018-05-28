import { AsyncStorage } from 'react-native';

export const DECK_STORAGE_KEY = 'flashcardstudyapp:deck20';

export function formatDecksResults(results) {
  console.log("you've hit the formatter");
  return results === null ? setDummyData() : logAndParseResults(results);
}

function logAndParseResults(results) {
  console.log('logging and parsing result of get decks');
  console.log('raw results: ' + results);
  console.log('Parsed Results: ' + JSON.parse(results));
  return JSON.parse(results);
}
function setDummyData() {
  console.log('setting dummy data');
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}
