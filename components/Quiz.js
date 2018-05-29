import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as decksActionCreators from '../ducks/decks';
import NewDeck from '../components/NewDeck.js';
import { AppLoading } from 'expo';
import { addCardToDeck } from '../utils/api';
import { decksFetched } from '../ducks/decks';
import { connect } from 'react-redux';
import { currentDeckFetched } from '../ducks/currentDeck';

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
            <Text>Question: {currentDeck['questions'][questionIndex]['question']}</Text>
            {!answerView && (
              <TouchableOpacity onPress={this.setState({ answerView: true })}>
                <Text>Show Answer</Text>
              </TouchableOpacity>
            )}
            {answerView && (
              <View>
                <Text>Answer: {currentDeck['questions'][questionIndex]['answer']}</Text>
                <TouchableOpacity onPress={this.setState({ answerView: false })}>
                  <Text>Hide Answer</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={this.setState({
                currentQuestion: currentQuestion + 1,
                questionIndex: questionIndex + 1,
                numberCorrect: numberCorrect + 1,
                answerView: false
              })}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.setState({
                currentQuestion: currentQuestion + 1,
                answerView: false
              })}>
              <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentQuestion > totalQuestions && (
          <View>
            <Text>You've finished the quiz!</Text>
            <Text>You answered {numberCorrect / totalQuestions}% of the questions correctly!</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Quiz;
