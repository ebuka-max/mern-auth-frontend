import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Layout from "./components/layout/Layout";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import LoginWithCode from "./pages/auth/LoginWithCode";
import Verify from "./pages/auth/Verify";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import UserList from "./pages/userList/UserList";
// import Loader from "./components/loader/Loader";
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "./redux/features/auth/authSlice";
import { GoogleOAuthProvider } from '@react-oauth/google';







axios.defaults.withCredentials = true;




function App() {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(getLoginStatus())
    if (isLoggedIn && user === null){
      dispatch(getUser())
    }
  }, [dispatch,isLoggedIn,user])

  

    return (
      <>

        <BrowserRouter>
        <ToastContainer />
        {/* <GoogleOAuthProvider clientId={import.meta.VITE_FIREBASE_CLIENT_ID}> */}
        <GoogleOAuthProvider clientId="502065027021-4krjd90np5jsni4msnuda6l9obf8giso.apps.googleusercontent.com">
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetPassword/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />

            <Route path="/verify/:verificationToken" element={<Layout><Verify /></Layout>}/>

            <Route path="/profile" element={<Layout><Profile /></Layout>}/>

            <Route path="/changePassword" element={<Layout><ChangePassword /></Layout>}/>
            <Route path="/users" element={<Layout><UserList /></Layout>}/>
          </Routes>
          </GoogleOAuthProvider>;
        </BrowserRouter>
      </>
    )
  }

export default App;