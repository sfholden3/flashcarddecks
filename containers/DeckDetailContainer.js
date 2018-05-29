import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeckDetail from '../components/DeckDetail.js';
import { AppLoading } from 'expo';
import { getCurrentDeck } from '../utils/api';
import { currentDeckFetched } from '../ducks/currentDeck';

class DeckDetailContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentDeck: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };
  state = {
    ready: false
  };

  componentDidMount() {
    console.log("you're in component did mount of deck detail container");
    const { dispatch } = this.props;
    const { deckTitle } = this.props.navigation.state.params;
    console.log('Current deck title as passed through nav: ' + deckTitle);

    getCurrentDeck(deckTitle)
      .then(deck => {
        console.log('hitting deck dispatch in the detail container');
        console.log('after dispatch, the deck: ' + deck);
        try {
          dispatch(currentDeckFetched(deck));
        } catch (err) {
          console.log('error in dispatch in detail container: ' + err);
        }
      })
      .then(() => {
        console.log('Final then: ' + this.props.currentDeck);
        this.setState(() => ({ ready: true }));
      });

    console.log('fetchedDecks: ');
  }

  render() {
    const { currentDeck, navigation } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View>
        <DeckDetail currentDeck={currentDeck} navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  currentDeck: decks.currentDeck
});

export default connect(mapStateToProps)(DeckDetailContainer);
