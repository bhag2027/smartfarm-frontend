// import axios from 'axios'
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const LoginUser = () =>{
//     const [data, setdata] = useState({
//         "email": "",
//         "password": ""
//     })
//     const inputHandler = (event) => {
//         setdata({ ...data, [event.target.name]: event.target.value })
//     }
//     const readValue = () => {
//         axios.post("http://localhost:3030/signin", data).then(
//             (response) => {
//                 if (response.data.status == "success") {
//                     sessionStorage.setItem("token", response.data.token)
//                     sessionStorage.setItem("userid", response.data.userid)
//                     navigate("/Userdashboard")
//                 }
//                 else {
//                     alert(response.data.status)
//                 }
//             }
//         ).catch(
//             (error) => {
//                 console.log(error.message)
//                 alert(error.message)
//             }
//         ).finally()
//     }
//     let navigate = useNavigate()
//   return (
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
//               <div className="text-center">
//                 <p className="text-light">
//                   New users click to Signup <Link to="/reg">Sign Up</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }



// export default LoginUser