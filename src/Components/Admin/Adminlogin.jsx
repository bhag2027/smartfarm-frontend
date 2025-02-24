// import React, { useState } from 'react';
// import  './Adminlogin.css'
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import NavBar from '../Navbar/NavBar';


// const Adminlogin = () =>{
//   const [data, setData] = useState({
//     email: '',
//     password: ''
//   });
//   const inputHandler = (event) => {
//     setData({ ...data, [event.target.name]: event.target.value });
//   };

//   const readValue = () => {
//     console.log(data);
      
//     axios.post("http://localhost:3030/adminlogin", data)
//     .then((response) => {
//       console.log(response.data);
//       if (response.data.status === "success") {
//        navigate('/admindashboard')
//       } else {
//         alert("Can't login. Please check your email or password.");
//       }
//       // Reset the input fields after login attempt
//       setData({
//         email: '',
//         password: ''
//       });
//     })
//     .catch((error) => {
//       console.error(error); // Handle errors
//       alert("An error occurred during login.");
//     });
// };
//     let navigate = useNavigate()


//   return (
//     <div>
//        <NavBar/>
   
    
//     <div className="login-page">
//     <div className="container">
//       <h1 className="text-center text-light"><u>Login</u></h1><br></br>
//       <div className="card mx-auto" style={{ maxWidth: '500px' }}>
//         <div className="card-body">
//           <div className="row">
//             <div className="col">
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label"><b>Email</b></label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="email"
//                   value={data.email}
//                   onChange={inputHandler}
//                   placeholder="Enter your email"
//                   autoComplete="off" // Disable browser autofill
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label"><b>Password</b></label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={data.password}
//                   onChange={inputHandler}
//                   placeholder="Enter your password"
//                   autoComplete="off" // Disable browser autofill
//                 />
//               </div>
//               <div className="mb-3 text-center">
//                 <button className="btn btn-success btn-block" onClick={readValue}>
//                   LOGIN
//                 </button>
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   </div>
//   )
// } 
// export default Adminlogin