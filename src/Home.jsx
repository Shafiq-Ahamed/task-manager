import { useState,useRef } from "react";
import "./home.css"
import { useNavigate } from "react-router-dom";
import {GoTasklist} from "react-icons/go";
const Home = () => {
      const [login, setlogin] = useState(true);
      const email=useRef();
      const password=useRef();
      const navigator=useNavigate();
    const handleSubmit=(e) => {
        e.preventDefault();
      const useremail=email.current.value;
      const userpassword=password.current.value;
      console.log("Email:",useremail);
      console.log("password:",userpassword);
      if(useremail&&userpassword){        
      navigator("/dashboard");
      }
      else{
        alert("please enter both email and password");
      }
      
    }
    const handleSignUp=(e)=>{
        e.preventDefault();
        setlogin(true);
        email.current.value="";
        password.current.value="";

    }
     return (
        <>
        <div className="home-container">
        <h1><GoTasklist size={35} color="#6213ebff"/> TaskFlow</h1>
            <p>Manage your tasks efficiently</p>
            <div className="home-card">
                <h2>Welcome</h2>
                <p>Sign in to your account or create a new one</p>
                <div className="toggle-buttons">
                    <button onClick={()=>setlogin(true)}className={login?"active":""} type="button">Login</button>               
                    <button onClick={()=>setlogin(false)}className={!login?"active":""} type="button">Sign Up</button>
                </div>
            <form onSubmit={login?handleSubmit:handleSignUp}>
                <label>Email</label>
                <input type="email" ref={email} placeholder="Enter your email"/>
                <label>Password</label>
                <input type="password" ref={password} placeholder="Enter your password"/>
            <button type="submit">{login?"login":"Create Account"}</button>
            </form>
            </div>
       </div>
        </>
    );
}
export default Home;

