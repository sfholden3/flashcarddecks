import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decksActionCreators from '../ducks/decks';
import DeckDetail from '../components/DeckDetail.js';

class DeckDetailContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchCurrentDeck: PropTypes.func.isRequired,
    currentDeck: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { deckTitle } = this.props.navigation.state.params;
    console.log("cdm: "+deckTitle);
    this.props.fetchCurrentDeck(deckTitle);
    console.log(this.props.currentDeck);
  }
  render() {
    const { currentDeck, navigation } = this.props;
    return (
      <View>
        <DeckDetail currentDeck={currentDeck} navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = currentDeck => ({
  currentDeck
});

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      ...decksActionCreators
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetailContainer);
