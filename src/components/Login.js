import React,{ useEffect, useState } from "react";
import { signInWithEmailAndPassword, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
    //   if (loading) {
    //     // maybe trigger a loading screen
    //     return;
    //   }
      if (user) {
          history.replace("/profile");
      }
    }, [user, loading]);

    return (
        <form>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input 
                type="email" 
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" 
                className="form-control" 
                placeholder="Enter email" 
                onChange={(e) => setEmail(e.target.value)} 
                required
                autoFocus/>
                <div class="requirements">
                    Must be a valid email address.
                </div>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                type="password" 
                pattern="(?=.*\d)(?=.*[A-z]).{6,20}" 
                className="form-control" 
                placeholder="Enter password"
                title="Password must contain at least 6 characters, including latters and numbers"
                onChange={(e) => setPassword(e.target.value)} 
                required/>
                <div class="requirements">
                Password must contain at least 6 characters, including latters and numbers
                </div>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button 
            type="submit" 
            className="btn btn-primary btn-block"
            onClick={(e) => {
                e.preventDefault();
                signInWithEmailAndPassword(email, password);
            }}>Log in</button>
        </form>
    );
}