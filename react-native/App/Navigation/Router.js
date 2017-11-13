// RN - components
import { StackNavigator, DrawerNavigator } from 'react-navigation'

// styles
import { Colors } from '../Themes'
// containers
import CustomerScreen from '../Containers/CustomerWallet'
import CheckoutScreen from '../Containers/Checkout'
import TransactionsScreen from '../Containers/Transactions'

const DrawerRoutes = {
  Customer: {
    screen: CustomerScreen
  },
  Checkout: {
    screen: CheckoutScreen
  },
  Transactions: {
    screen: TransactionsScreen
  }
}

const DrawerOptions = {
  initialRouteName: 'Customer',
  drawerWidth: 200
}

const Router = StackNavigator({
  Customer: {
    screen: DrawerNavigator(DrawerRoutes, DrawerOptions),
    navigationOptions: {
      headerStyle: { backgroundColor: Colors.brand },
      headerTitle: 'Chlu',
      headerTitleStyle: { color: Colors.snow }
    }
  }
}, { initialRouteName: 'Customer' })

export default Router
