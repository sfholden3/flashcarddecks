import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decksActionCreators from '../ducks/decks';

class DeckList extends Component {
  static propTypes = {
    decks: PropTypes.object
  };
  state = {
    hasDecks: false
  };

  constructor(props) {
    super(props);
    console.log('constructor of DeckList');
    console.log(props.decks);
  }
  onSelectDeck = currentDeckTitle => {
    this.props.navigation.navigate('DeckDetailContainer', { deckTitle: currentDeckTitle });
  };
  render() {
    const { decks } = this.props;

    return (
      <View>
        {Object.keys(decks).map(deck => (
          <TouchableOpacity key={deck} onPress={() => this.onSelectDeck(deck)}>
            <Text key={[deck, 'title'].join()}>{decks[deck]['title']}</Text>
            <Text key={[deck, 'questions'].join()}>{decks[deck]['questions'].length} cards</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default DeckList;
