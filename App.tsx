import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#223265'} />
      <AppNavigation />
    </Provider>
  );
};

export default App;
