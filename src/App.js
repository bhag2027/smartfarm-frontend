import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './Components/AddUser';
import LoginUser from './Components/LoginUser';

function App() {
  return (
    <div>
<BrowserRouter>
<Routes>
  <Route path='/reg' element={<AddUser/>}/>
  <Route path='/' element={<LoginUser/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
