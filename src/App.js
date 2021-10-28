import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

import store from './stores';
import MainNavigation from './navigations/Navigation';

import OfflineGateScreen from './screens/offlineGateScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Provider store={store}>
        <OfflineGateScreen>
          <MainNavigation />
        </OfflineGateScreen>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
