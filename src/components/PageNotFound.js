import React,{ useEffect, useState, Component } from "react";
import { signInWithEmailAndPassword, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";

export default function PageNotFound() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    return (
        <form>
            <h3>Oops... this page doesn't exist</h3>

            <button 
            type="submit" 
            className="btn btn-primary btn-block"
            onClick={(e) => {
                e.preventDefault();
                if(user) {
                    history.replace("/profile");
                }
                else {
                    history.replace("/login");
                }
            }}>{user ? "Go to profile page" : "Go to login page"}</button>
        </form>
    );
}