import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, View, Platform, StatusBar } from 'react-native';
import * as APIFUNCS from './utils/api.js';
import DeckListContainer from './containers/DeckListContainer.js';
import NewDeckContainer from './containers/NewDeckContainer.js';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { purple, white } from './utils/colors';
import { Constants } from 'expo';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './ducks';
import thunkMiddleware from 'redux-thunk';
import DeckDetailContainer from './containers/DeckDetailContainer.js';
import AddCardContainer from './containers/AddCardContainer.js';
import QuizContainer from './containers/QuizContainer.js';

const Tabs = createMaterialTopTabNavigator(
  {
    DeckListContainer: {
      screen: DeckListContainer,
      navigationOptions: {
        tabBarLabel: 'Decks'
      }
    },
    NewDeckContainer: {
      screen: NewDeckContainer,
      navigationOptions: {
        tabBarLabel: 'New Deck'
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  },
  DeckDetailContainer: {
    screen: DeckDetailContainer,
    navigationOptions: {
      tabBarLabel: 'Flash Card Deck'
    }
  },
  AddCardContainer: {
    screen: AddCardContainer,
    navigationOptions: {
      tabBarLabel: 'Add Card'
    }
  },
  QuizContainer: {
    screen: QuizContainer,
    navigationOptions: {
      tabBarLabel: 'Quiz'
    }
  }
});

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends Component {
  state = {
    text: 'not changed'
  };
  onPress = () => {
    APIFUNCS.saveDeckTitle('Test');
    APIFUNCS.addCardToDeck('Test', {
      question: 'BLAH',
      answer: 'BLAH'
    });
  };

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
