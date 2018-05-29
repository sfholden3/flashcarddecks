import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as decksActionCreators from '../ducks/decks';
import Quiz from '../components/Quiz.js';
import { AppLoading } from 'expo';
import { addCardToDeck } from '../utils/api';
import { decksFetched } from '../ducks/decks';
import { connect } from 'react-redux';
import { currentDeckFetched } from '../ducks/currentDeck';

class QuizContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentDeck: PropTypes.object.isRequired
  };

  render() {
    const { currentDeck, navigation } = this.props;
    return (
      <View>
        {currentDeck['questions'].length > 0 && (
          <Quiz currentDeck={currentDeck} totalQuestions={currentDeck['questions'].length} navigation={navigation} />
        )}
        {currentDeck['questions'].length === 0 && <Text>There are no questions added yet.</Text>}
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  currentDeck: decks.currentDeck
});

export default connect(mapStateToProps)(QuizContainer);
