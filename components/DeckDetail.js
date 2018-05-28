import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class DeckDetail extends Component {
  static propTypes = {

  };
  render() {
    const { currentDeck } = this.props;
    return (
      <View>
        <Text>Deck Detail!</Text>
      </View>
    );
  }
}

export default DeckDetail;
