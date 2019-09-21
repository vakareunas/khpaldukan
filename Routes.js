import { createStackNavigator, createAppContainer } from "react-navigation";

import ListScreen from './screens/ListScreen'

const AppNavigator = createStackNavigator({
    Products: {
      screen: ListScreen
    }
  });
  
  export default createAppContainer(AppNavigator);