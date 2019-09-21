import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import ListScreen from './screens/ListScreen'
import LastScreen from './screens/LastScreen'
import LoginScreen from './screens/LoginScreen'
import Registration from './screens/Registration'
import CartScreen from './screens/CartScreen'
import Dashboard from './screens/Dashboard'
import Userorders from './screens/Userorders'
import SearchScreen from './screens/SearchScreen'

const MyDrawerNavigator = createDrawerNavigator({
    Main: createStackNavigator({
      Home: HomeScreen,
      Products: ListScreen,
      Detail: LastScreen,
      Dashboard: Dashboard,
      Userorders: Userorders,
      Search: SearchScreen
    }),
    Cart: createStackNavigator({
      CartScreen: CartScreen
    }),
    Login: createStackNavigator({
      Login: LoginScreen
    }),
    Registration: createStackNavigator({
      Registration: Registration
    })
  });
  
  const MyApp = createAppContainer(MyDrawerNavigator);
  export default MyApp