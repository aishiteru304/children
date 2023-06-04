import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NewProduct from './pages/NewProduct'
import Information from './pages/Information';

function App() {


  return (
    <div className="App">
      <Toaster />
      <Header />
      <div className='pt-16 bg-slate-100 min-h-screen'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/newproduct' element={<NewProduct />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/information' element={<Information />} />
          <Route exact path='*' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
