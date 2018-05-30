import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import PropTypes from 'prop-types';
import { purple, white } from '../utils/colors';

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
    clearLocalNotification().then(setLocalNotification);
    this.props.navigation.navigate('QuizContainer', { deckTitle: this.props.currentDeck });
  };
  render() {
    const { currentDeck } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.mainItem}>{currentDeck['title']}</Text>
        <Text>{currentDeck['questions'].length} cards</Text>
        <TouchableOpacity style={styles.button} onPress={this.AddCard}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.StartQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
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

export default DeckDetail;
