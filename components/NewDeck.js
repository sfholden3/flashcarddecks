import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { purple, white } from '../utils/colors';

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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 30 }}>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={currentTitle => this.setState({ currentTitle })}
          value={this.state.currentTitle}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: purple,
            alignSelf: 'center',
            borderRadius: 5,
            margin: 20
          }}
          onPress={this.submit}>
          <Text
            style={{
              color: white,
              fontSize: 20
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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

export default NewDeck;
