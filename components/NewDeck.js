import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class NewDeck extends Component {
  static propTypes = {
    saveNewDeck: PropTypes.func.isRequired
  };
  state = {
    currentTitle: ''
  };
  submit = () => {
    this.props.saveNewDeck(this.state.currentTitle);
  };
  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={currentTitle => this.setState({ currentTitle })}
          value={this.state.currentTitle}
        />
        <TouchableOpacity onPress={this.submit}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NewDeck;
