import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Homes/UserHome";


import ClientSignup from "./pages/LoginAndSignUp/ClientSignup";


import FreelancerHome from "./pages/Homes/ClientHome";
import CreatePost from "./pages/Post/CreatePost";
import Signup from "./pages/LoginAndSignUp/Signup";
import Login from "./pages/LoginAndSignUp/Login";

import Applications from "./pages/Application/Applications";

import ClientRoute from "./components/Navigate/ProtectedRouter/ClientRoute";
import UserRoute from "./components/Navigate/ProtectedRouter/UserRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route exact path="/" element={<UserRoute><Home /></UserRoute>}></Route>
        <Route exact path="/client/signup" element={<ClientSignup />}></Route>
        <Route exact path="/client" element={<ClientRoute><FreelancerHome /></ClientRoute>}></Route>
        <Route exact path="/create-post" element={<ClientRoute><CreatePost /></ClientRoute>}></Route>
        <Route exact path="/applications/:id" element={<ClientRoute><Applications /></ClientRoute>}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
      
      </Routes>
    </Router>
  );
}

export default App;
