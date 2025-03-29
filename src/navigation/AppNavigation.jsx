// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import Home from '../screens/Home';

// const Stack = createStackNavigator();

// const AppNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name={'Home'} component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigation;

// const styles = StyleSheet.create({});

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavs = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LoginSgreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="StackNavs"
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="StackNavs" component={StackNavs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
