import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './Components/Users/AddUser';
import LoginUser from './Components/Users/LoginUser';
import Home from './Components/Home/Home';
import AdminLogin from './Components/Admin/Adminlogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ViewUser from './Components/Admin/ViewUser';
import SearchUser from './Components/Admin/SearchUser';
import LoginVendor from './Components/Vendor/LoginVendor';
import Vendordashboard from './Components/Vendor/Vendordashboard';
import AddVendor from './Components/Vendor/AddVendor';
import AddProducts from './Components/Vendor/AddProducts';
import ViewProducts from './Components/Users/ViewProducts';
import Userdashboard from './Components/Users/Userdashboard';
import ViewProd from './Components/Vendor/ViewProd';
import ViewVendors from './Components/Admin/ViewVendors';

import ProductBooking from './Components/Users/ProductBooking';
import VendorBookings from './Components/Vendor/ViewMyOrders';

import ViewMyBookings from './Components/Users/ViewMyBookings';
import ViewMyOrders from './Components/Vendor/ViewMyOrders';
import Login from './Components/Users/Login';
import ServicePage from './Components/Home/ServicePage';
import AdminCreatePost from './Components/Admin/AdminCreatePost';
import Admin from './Components/Admin';
import { useState } from 'react';
import ViewPost from './Components/Admin/ViewPost';
import Rates from './Components/Users/Rates';
import ViewRates from './Components/Vendor/ViewRates';
import ReturnBooking from './Components/Users/ReturnBooking';
import ViewMyReturns from './Components/Vendor/ViewMyReturns';
import ResaleForm from './Components/Users/ResaleForm';
import SearchBookedProducts from './Components/Users/SearchBookedProducts';

import ViewResale from './Components/Vendor/ViewResale';


function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  return (
    <div>
 
<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/service' element={<ServicePage/>}/>
  <Route path='/reg' element={<AddUser/>}/>
  {/* <Route path='/login' element={<LoginUser/>}/> */}
  {/* <Route path='/adminlogin' element={<AdminLogin/>}/> */}
  <Route path='/admindashboard' element={<AdminDashboard/>}/>
  <Route path='/view' element={<ViewUser/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/viewvendor' element={<ViewVendors/>}/>
  <Route path='/search' element={<SearchUser/>}/>
  <Route path='/vendorlogin' element={<LoginVendor/>}/>
  <Route path='/Vendordashboard' element={<Vendordashboard/>}/>
  <Route path='/Vendoradd' element={<AddVendor/>}/>
  <Route path='/Userdashboard' element={<Userdashboard/>}/>
  <Route path='/add-product' element={<AddProducts/>}/>
  <Route path='/view-products' element={<ViewProducts/>}/>
  <Route path='/viewproducts' element={<ViewProd/>}/>
  <Route path="/booking/:productId"element={<ProductBooking />} /> {/* Home page that shows products */}
  <Route path="/vendorbookings"element={<ViewMyOrders />} />
  <Route path="/view-my-bookings" element={<ViewMyBookings />} />
  <Route path="/postrates" element={<Rates />} />
  <Route path="/viewrate" element={<ViewRates />} />
  <Route path="/return-booking/:bookingId"element={<ReturnBooking/>} />
  <Route path="/returns/:vendorId" element={<ViewMyReturns/>} />
  <Route path="/admin-posts" element={<ViewPost/>} />
  <Route path="/postcreate" element={<AdminCreatePost />} />
  <Route path="/resale" element={<ResaleForm/>} />
  <Route path="/vendor-view"element={<ViewResale/>} />

  <Route path="/search-booked-products" element={<SearchBookedProducts/>} />

   {/* Other routes */}
   {isAdminLoggedIn && <Route path='/admin' element={<Admin/>} />} {/* Conditionally render Admin */}
  
  


  
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
