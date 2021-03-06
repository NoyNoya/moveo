import React,{ useEffect, useState } from "react";
import { signInWithEmailAndPassword, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [user, loading] = useAuthState(auth);
    const history = useHistory();
    const [showUserNotFoundEror, setShowUserNotFoundEror] = useState(false);
    
    useEffect(() => {
    //   if (loading) {
    //     // maybe trigger a loading screen
    //     return;
    //   }
      if (user) {
          history.replace("/profile");
      }
    }, [user, loading, history]);

    return (
        <form>
            <img 
            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1469622513/pf5lnfgaaxe8sptd6dgk.png" 
            alt="moveo" 
            width="70"
            className="moveo-icon"
            ></img>
            
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input 
                id="emailInputElement"
                type="email" 
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" 
                className="form-control" 
                placeholder="Enter email" 
                onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(e.target.checkValidity());
                }} 
                required
                autoFocus/>
                <div className="requirements">
                    Must be a valid email address.
                </div>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                id="passwordInputElement"
                type="password" 
                pattern="(?=.*\d)(?=.*[A-z]).{6,20}" 
                className="form-control" 
                placeholder="Enter password"
                title="Password must contain at least 6 characters, including latters and numbers"
                onChange={(e) => {
                    setPassword(e.target.value);
                    setIsPasswordValid(e.target.checkValidity());                
                }}
                required/>
                <div className="requirements">
                Password must contain at least 6 characters, including latters and numbers
                </div>
            </div>
            <div className={showUserNotFoundEror ? "user-not-found-error-message" : ""}>{showUserNotFoundEror ? "Sorry, we can't find an account with this email address. Please try again" : ""}</div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isEmailValid === false || isPasswordValid === false}
            onClick={(e) => {
                e.preventDefault();
                signInWithEmailAndPassword(email, password, setShowUserNotFoundEror);
            }}>Log in</button>
        </form>
    );
}