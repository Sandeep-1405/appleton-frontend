import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import AddProduct from './Components/AddProduct'
import Orders from './Components/Orders'
import ProductDetails from './Components/ProductDetails'
import Cart from './Components/Cart'
import Address from './Components/Address'
import OrderDetails from './Components/OrderDetails'
import ForgotPassword from './Components/ForgotPassword'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-address' element={<Address />} />
        <Route path='/order-details/:id' element={<OrderDetails />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
