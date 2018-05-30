import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as decksActionCreators from '../ducks/decks';
import NewDeck from '../components/NewDeck.js';
import { AppLoading } from 'expo';
import { addCardToDeck } from '../utils/api';
import { decksFetched } from '../ducks/decks';
import { connect } from 'react-redux';
import { currentDeckFetched } from '../ducks/currentDeck';
import { purple, white } from '../utils/colors';

class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentDeck: PropTypes.object.isRequired,
    totalQuestions: PropTypes.number.isRequired
  };
  state = {
    currentQuestion: 1,
    questionIndex: 0,
    numberCorrect: 0,
    answerView: false
  };

  render() {
    const { currentDeck, totalQuestions } = this.props;
    const { currentQuestion, questionIndex, numberCorrect, answerView } = this.state;
    return (
      <View>
        {currentQuestion <= totalQuestions && (
          <View>
            <Text>
              {currentQuestion}/{totalQuestions}
            </Text>
            <View style={styles.container}>
              {!answerView && (
                <View style={styles.container}>
                  <Text style={styles.mainItem}>{currentDeck['questions'][questionIndex]['question']}</Text>
                  <TouchableOpacity onPress={() => this.setState({ answerView: true })}>
                    <Text style={{ color: purple, justifyContent: 'center' }}>Show Answer</Text>
                  </TouchableOpacity>
                </View>
              )}
              {answerView && (
                <View style={styles.container}>
                  <Text style={styles.mainItem}>{currentDeck['questions'][questionIndex]['answer']}</Text>
                  <TouchableOpacity onPress={() => this.setState({ answerView: false })}>
                    <Text style={{ color: purple, justifyContent: 'center' }}>Show Question</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.setState({
                    currentQuestion: currentQuestion + 1,
                    questionIndex: questionIndex + 1,
                    numberCorrect: numberCorrect + 1,
                    answerView: false
                  })
                }>
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  this.setState({
                    currentQuestion: currentQuestion + 1,
                    answerView: false,
                    questionIndex: questionIndex + 1
                  })
                }>
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {currentQuestion > totalQuestions && (
          <View>
            <Text>You've finished the quiz!</Text>
            <Text>You answered {numberCorrect / totalQuestions * 100}% of the questions correctly!</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainItem: {
    fontSize: 30
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: white,
    fontSize: 20
  }
});

export default Quiz;
