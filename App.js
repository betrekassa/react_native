import React from 'react';
import {  createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createSwitchNavigator ,
         createAppContainer
        } from 'react-navigation';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';

import { Provider as AuthProvider} from './src/context/AuthContext';

import {setNavigator} from './src/navigationRef';

const swithNavigator = createSwitchNavigator({
      loginFlow: createStackNavigator({
          SignUp: SignUpScreen,
          SignIn: SignInScreen
      }
      ),
      mainFlow: createBottomTabNavigator({
          trakListFlow: createStackNavigator({
            TrackList: TrackListScreen,
            TrackDetail: TrackDetailScreen
          }),
          TrackCreate: TrackCreateScreen,
          Account: AccountScreen
      })
});

//export default createAppContainer(swithNavigator);

const App = createAppContainer(swithNavigator);

export default () => {
  return ( 
      <AuthProvider>
          <App ref={(navigator) => {setNavigator(navigator)}}/>
      </AuthProvider>
         );
      };