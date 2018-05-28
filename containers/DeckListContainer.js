import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as decksActionCreators from '../ducks/decks';
import DeckList from '../components/DeckList.js';
import { AppLoading } from 'expo';
import { getDecks } from '../utils/api';
import { decksFetched } from '../ducks/decks';

class DeckListContainer extends Component {
  static propTypes = {
    decks: PropTypes.object,
    navigation: PropTypes.object.isRequired
  };
  state = {
    ready: false
  };

  componentDidMount() {
    console.log("you're in component did mount of deck list container");
    const { dispatch } = this.props;

    getDecks()
      .then(decks => {
        console.log("hitting decks dispatch in the container");
        try{
        dispatch(decksFetched(decks))
        }
        catch(err){
          console.log("error in dispatch in container: "+err);
        }
      })
      .then(() => {
        console.log("Final then: "+this.props.decks);
        this.setState(() => ({ ready: true }))});

    console.log('fetchedDecks: ');
    console.log(this.props.decks);
  }
  render() {
    const { decks, navigation } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View>
        <DeckList decks={decks} navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});


export default connect(mapStateToProps)(DeckListContainer);
