import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as decksActionCreators from '../ducks/decks';
import { AppLoading } from 'expo';
import { addCardToDeck } from '../utils/api';
import { decksFetched } from '../ducks/decks';
import { connect } from 'react-redux';
import { currentDeckFetched } from '../ducks/currentDeck';
import { purple, white } from '../utils/colors';

class AddCardContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  state = {
    loading: false,
    currentQuestion: '',
    currentAnswer: ''
  };

  submitNewCard = () => {
    console.log("you're in the submit of new card container");
    const { dispatch, navigation } = this.props;
    const { deckTitle } = this.props.navigation.state.params;
    console.log('Current deck title as passed through nav for adding card: ' + deckTitle);
    const question = {
      question: this.state.currentQuestion,
      answer: this.state.currentAnswer
    };

    addCardToDeck(deckTitle, question)
      .then(decks => {
        console.log('hitting save new card dispatch in the container');
        console.log('new deck: ' + decks);
        try {
          dispatch(decksFetched(decks));
          dispatch(currentDeckFetched(decks[deckTitle]));
        } catch (err) {
          console.log('error in dispatch in NewDeckContainer: ' + err);
        }
      })
      .then(() => {
        console.log('Final then: now should navigate home');
        this.setState(() => ({
          loading: false,
          currentQuestion: '',
          currentAnswer: ''
        }));
        this.props.navigation.navigate('DeckDetailContainer', { deckTitle: deckTitle });
      });

    console.log('fetchedDecks: ');
    console.log(this.props.decks);
  };

  render() {
    const { loading } = this.state;
    if (loading === true) {
      return <AppLoading />;
    }
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={currentQuestion => this.setState({ currentQuestion })}
          value={this.state.currentQuestion}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={currentAnswer => this.setState({ currentAnswer })}
          value={this.state.currentAnswer}
        />
        <TouchableOpacity style={styles.button} onPress={this.submitNewCard}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});

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

export default connect(mapStateToProps)(AddCardContainer);
