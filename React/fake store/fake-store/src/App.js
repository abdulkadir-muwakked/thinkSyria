import './App.css';
import { Routes, Route } from "react-router-dom";

import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import SingleProduct from './components/Products/SingleProduct';
import { AuthContext } from './context/AtuthContext';
import { useContext } from 'react';
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import Notification from "./components/Notifications/Notifications";
import Carts from './pages/Carts/Carts';


const App = () => {
  const { token } = useContext(AuthContext)
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />}/>
        <Route path={"/signup"} element={<SignUp />}/>
        <Route path={"/signin"} element={<SignIn />}/>
        <Route path={"noutfound"} element={<NotFound />}/>
        {token &&  <Route path={"/:id"} element={<SingleProduct />}/>}
        {token &&  <Route path={"/carts"} element={<Carts />}/>}
      </Routes>
      <Notification />  
    </div>
  );
}

export default App;
