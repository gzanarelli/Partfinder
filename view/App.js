import React, { Component } from 'react';
import Plateform, { StatusBar } from 'react-native';
import AppContainer from './Components/Navigation/navigation';
import { SafeAreaView } from 'react-navigation';
import userToken from './Components/Reducer/token.reducer';
import partnerID from './Components/Reducer/partnerID.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({ userToken, partnerID }));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{width: '100%', height: '100%', paddingTop: Plateform.os !== 'ios' ? StatusBar.currentHeight  : 0 }} forceInset={{ bottom: 'never' }}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
    );
  }
}
