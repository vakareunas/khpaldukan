import React, { Component } from 'react';
//import { createStackNavigator, createAppContainer } from "react-navigation";
import { StatusBar, Platform } from 'react-native'
import { Container } from 'native-base'
import Drawer from './Drawer'
//import Routes from './Routes'
// import ListScreen from './screens/ListScreen'
import { Provider } from 'react-redux'

import store from './store/store'

export default class App extends Component{
   render(){
     return(
       <Container>
         <StatusBar
          barStyle="dark-content"
          height="10"
          backgroundColor="#ecf0f1"
        />
        <Provider store={store}>
          <Drawer/>
        </Provider>
      </Container>
     );
   }
}//End of App class

// const AppNavigator = createStackNavigator({
//   Products: {
//     screen: ListScreen
//   }
// });

// const navi =  createAppContainer(AppNavigator);