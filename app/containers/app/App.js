import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AppState } from 'react-native';

import OverlayNavigator from '../../router/OverlayNavigator';
import store from '../../store';
import '../../localization/I18n';
import UserAPI from '../../services/UserAPI';


class App extends Component {

  state = {
    appState: AppState.currentState
  }

  // componentDidMount() {
  //   AppState.addEventListener('change', this._handleAppStateChange);
  // }

  // componentWillUnmount() {
  //   AppState.removeEventListener('change', this._handleAppStateChange);
  // }

  // _handleAppStateChange = (nextAppState) => {
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log('App has come to the foreground!')
  //     UserAPI.refreshToken().then(data=>{

  //     }, error =>{

  //     })
  //   }
  //   this.setState({appState: nextAppState});
  // }

  render() {
    return (
      <Provider store={store}>
        <OverlayNavigator />
      </Provider>
    );
  }


}

export default App;
