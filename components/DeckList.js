import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView>
        {Object.keys(decks).map(deck => (
          <TouchableOpacity style={styles.listItems} key={deck} onPress={() => this.onSelectDeck(deck)}>
            <Text style={styles.mainItem} key={[deck, 'title'].join()}>
              {decks[deck]['title']}
            </Text>
            <Text key={[deck, 'questions'].join()}>{decks[deck]['questions'].length} cards</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    borderBottomWidth: 1
  },
  mainItem: {
    fontSize: 22
  }
});

export default DeckList;
