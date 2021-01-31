import React from 'react'; 
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import AdminEditOrderScreen from './screens/AdminEditOrderScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import AdminProductList from './screens/AdminProductList';
import CartScreen from './screens/CartScreen';
import EditProduct from './screens/EditProductScreen';
import EdituserScreen from './screens/EditUserScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NewProduct from './screens/NewProductScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScren';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserListScreen from './screens/UserListScreen';

alert(`
!*!- ATTEZIONE -!*!
  Questo è un sito dimostrativo
  pensato per presentare un prodotto in lavorazione
  inserire solamente dati fittizi
`)

const App = () => {
  return (
    <Router>
      <Header/>
    <main className='py-3'>
      <Container>
      <Route path='/login' component={LoginScreen} />
      <Route path='/user/:id/edit' component={EdituserScreen} exact/>
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/favorites' component={FavoriteScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/orders/:id' component={OrderScreen} />
      <Route path='/order/:id/edit' component={AdminEditOrderScreen} />
      <Route path='/payment' component={PaymentMethodScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/newProduct' component={NewProduct} exact/>
      <Route path='/product/:id' component={ProductScreen} exact/>
      <Route path='/product/:id/edit' component={EditProduct} exact/>
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/admin/userList' component={UserListScreen} />
      <Route path='/admin/productList' component={AdminProductList} />
      <Route path='/admin/orderList' component={AdminOrderListScreen} />
      <Route path='/' component={HomeScreen} exact/>
      </Container>
    </main>
      <Footer/>
    </Router>
  );
}

export default App;
