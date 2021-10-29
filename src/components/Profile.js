import React,{ useEffect, useState, Component } from "react";
import { logOut, auth, fetchUser } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import './Profile.css';

export default function Profile() {
    const [extendedUserInfo, setExtendedUserInfo] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.replace("/login");
        }
        else {
            async function fetchExtendedUserInfo() {
                let extendedUser = await fetchUser(user.uid)
                setExtendedUserInfo(extendedUser);
            }
            fetchExtendedUserInfo();
        }
    }, [user, extendedUserInfo]);

    if(user && extendedUserInfo){
        return (
            <form>
                <h3>{extendedUserInfo.name}</h3>

                <div className="form-group">
                    <label>Email address:</label>
                    <div className="user-property-value">{user.email}</div>
                </div>

                <div className="form-group">
                    <label>Birth Date:</label>
                    <div className="user-property-value">{new Date(extendedUserInfo.birthDate.seconds * 1000).toDateString()}</div>
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <div className="user-property-value">{extendedUserInfo.address}</div>
                </div>

                <div>
                    <button 
                    className="btn btn-primary btn-block"
                    onClick={(e) => {
                        e.preventDefault();
                        logOut();
                        history.replace("/login");
                        }}>Log out</button>
                </div>  
            </form>
                
        );
    }
    else {
        return (<div>Loading...</div>);
    }
}