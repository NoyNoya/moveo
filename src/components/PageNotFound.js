import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import './PageNotFound.css';

export default function PageNotFound() {
    const [user] = useAuthState(auth);
    const history = useHistory();

    return (
        <form className="page-not-found-form">
            <h3>Oops... this page doesn't exist</h3>

            <img 
            src="https://media2.giphy.com/media/4Z7DE87md7MdOGvAAA/giphy.gif?cid=ecf05e47gy2ryttovsd0ax3pibf2ng171lhjldryko89bwke&rid=giphy.gif&ct=g" 
            alt="Page not found" 
            width="300"
            className="robot-page-not-found-gif"
            ></img>

            <button 
            type="submit" 
            className="btn go-back-button btn-block"
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