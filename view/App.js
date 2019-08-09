import React, { Component } from 'react';
import AppContainer from './Components/Navigation/navigation';
import { SafeAreaView } from 'react-navigation';
import userToken from './Components/Reducer/token.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({ userToken }));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{width: '100%', height: '100%', }} forceInset={{ bottom: 'never' }}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
    );
  }
}
