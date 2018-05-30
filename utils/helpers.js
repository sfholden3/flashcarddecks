import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'flashcardstudyapp:notifications';

export const DECK_STORAGE_KEY = 'flashcardstudyapp:deck22';

export function formatDecksResults(results) {
  console.log("you've hit the formatter");
  return results === null ? setDummyData() : JSON.parse(results);
}

export function formatandSelectCurrentDeck(results, deckTitle) {
  console.log("you've hit the current deck formatter");
  return results === null
    ? console.error('No results returned to provide details on.')
    : logAndParseResults(results, deckTitle);
}
function logAndParseResults(results, deckTitle) {
  const allDecks = JSON.parse(results);
  console.log('All decks: ' + allDecks);
  const currentDeck = allDecks[deckTitle];
  console.log('Current deck: ' + currentDeck);
  if (currentDeck === null || typeof currentDeck === undefined) {
    console.error('No deck found by name: ' + deckTitle);
  }
  return currentDeck;
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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Study your flash cards!',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      console.log("setting up local notification");
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
