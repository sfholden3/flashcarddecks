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
    console.log(props.decks)
  }
  onSelectDeck = currentDeckTitle => {
    //this.props.navigation.navigate('DeckDetailContainer', { deckTitle: currentDeckTitle });
    //const decks = APIFUNCS.getDecks();
    //console.log(decks);

  };
  render() {
    const { decks } = this.props;
    return (
      <View>
        <Text>There are decks</Text>
        {Object.keys(decks).map(deck => 
        <Text key={deck}>{deck}</Text>)}
 
      </View>
    );
  }
}

export default DeckList;
