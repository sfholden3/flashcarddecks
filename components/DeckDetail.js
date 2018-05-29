import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class DeckDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentDeck: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    console.log('Constructor of deck detail: ');
    console.log(props.currentDeck);
  }
  AddCard = () => {
    this.props.navigation.navigate('AddCardContainer', { deckTitle: this.props.currentDeck['title'] });
  };
  StartQuiz = () => {
    this.props.navigation.navigate('QuizContainer', { deckTitle: this.props.currentDeck });
  };
  render() {
    const { currentDeck } = this.props;
    return (
      <View>
        <Text>{currentDeck['title']}</Text>
        <Text>{currentDeck['questions'].length} cards</Text>
        <TouchableOpacity onPress={this.AddCard}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.StartQuiz}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckDetail;
