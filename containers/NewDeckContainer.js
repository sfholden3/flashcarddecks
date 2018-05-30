import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as decksActionCreators from '../ducks/decks';
import { AppLoading } from 'expo';
import { saveDeckTitle } from '../utils/api';
import { decksFetched } from '../ducks/decks';
import { connect } from 'react-redux';
import { purple, white } from '../utils/colors';

class NewDeckContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  state = {
    loading: false,
    currentTitle: ''
  };

  submitNewDeck = () => {
    console.log("you're in the submit of new deck container");
    const { dispatch, navigation } = this.props;
    this.setState(() => ({ loading: true }));

    saveDeckTitle(this.state.currentTitle)
      .then(newDeck => {
        console.log('hitting save title dispatch in the container');
        console.log('new deck: ' + newDeck);
        try {
          dispatch(decksFetched(newDeck));
        } catch (err) {
          console.log('error in dispatch in NewDeckContainer: ' + err);
        }
      })
      .then(() => {
        console.log('Final then: now should navigate home');
        navigation.navigate('DeckDetailContainer', { deckTitle: this.state.currentTitle });
        this.setState(() => ({
          loading: false,
          currentTitle: ''
        }));
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
        <Text style={styles.mainItem}>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={currentTitle => this.setState({ currentTitle })}
          value={this.state.currentTitle}
        />
        <TouchableOpacity style={styles.button} onPress={this.submitNewDeck}>
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});

const styles = StyleSheet.create({
  mainItem: {
    fontSize: 20,
    justifyContent: 'center',
    padding: 10
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

export default connect(mapStateToProps)(NewDeckContainer);
