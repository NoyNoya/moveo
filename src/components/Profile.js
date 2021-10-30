import React,{ useEffect, useState } from "react";
import { logOut, auth, fetchUser } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import './Profile.css';
import { Home, Cake, AlternateEmail, Edit} from '@material-ui/icons';

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
    }, []);

    if(user && extendedUserInfo){
        return (
            <form>
                <div class="image-title-container">
                    <img src={extendedUserInfo.avatarUrl} alt={extendedUserInfo.name} className="rounded-circle" width="110"></img>
                    <h2>{extendedUserInfo.name}</h2>
                    <div></div>
                </div>
                <div className="form-group">
                <div className="icon-label-container">
                        <AlternateEmail></AlternateEmail>
                        <label>Email:</label>
                    </div>
                    <div className="user-property-value">{user.email}</div>
                </div>

                <div className="form-group">
                    <div className="icon-label-container">
                        <Home></Home>
                        <label>Address:</label>
                    </div>
                    <div className="user-property-value">{extendedUserInfo.address}</div>
                </div>

                <div className="form-group">
                <div className="icon-label-container">
                        <Cake></Cake>
                        <label>Birth date:</label>
                    </div>
                    <div className="user-property-value">{new Date(extendedUserInfo.birthDate.seconds * 1000).toDateString()}</div>
                </div>

                <div className="logout-button-container">
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