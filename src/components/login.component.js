import React,{ useEffect, useState, Component } from "react";
import { signInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    // useEffect(() => {
    //   if (loading) {
    //     // maybe trigger a loading screen
    //     return;
    //   }
    //   if (user) history.replace("/dashboard");
    // }, [user, loading]);

    return (
        <form>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
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
            onClick={() => signInWithEmailAndPassword(email, password)}>Submit</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
}