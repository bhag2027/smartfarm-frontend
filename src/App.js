import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './Components/AddUser';

function App() {
  return (
    <div>
<BrowserRouter>
<Routes>
  <Route path='/reg' element={<AddUser/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
