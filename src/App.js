import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/index';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import Cart from './pages/cart/Cart';
import PlaceOrder from './paymentMethod/placeOrder/PlaceOrder';
import "@stripe/stripe-js";
import Success from './paymentMethod/Success';
import Cancel from './paymentMethod/Cancel';

const App = () => {

  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/signUp' element={<SignUp />} />
        <Route exact path='/signIn' element={<SignIn />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/placeOrder' element={<PlaceOrder />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;