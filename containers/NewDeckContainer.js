import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as decksActionCreators from '../ducks/decks';
import NewDeck from '../components/NewDeck.js';
import { AppLoading } from 'expo';
import { saveDeckTitle } from '../utils/api';
import { decksFetched } from '../ducks/decks';
import { connect } from 'react-redux';

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
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={currentTitle => this.setState({ currentTitle })}
          value={this.state.currentTitle}
        />
        <TouchableOpacity onPress={this.submitNewDeck}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});

export default connect(mapStateToProps)(NewDeckContainer);
