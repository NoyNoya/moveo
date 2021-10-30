import React,{ useEffect, useState } from "react";
import { logOut, auth, fetchUser, updateDocument } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import './Profile.css';
import { Home, Cake, HighlightOff, AlternateEmail, EditTwoTone, Done } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

export default function Profile() {
    const [extendedUserInfo, setExtendedUserInfo] = useState(null);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isAddressEditing, setIsAddressEditing] = useState(false);
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");

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
    }, [name, address,history, user]);

    const updateUser = async (updatedField) => {
        await updateDocument(user.uid, updatedField);
        setIsNameEditing(false);
        setIsAddressEditing(false);
    }

    if(user && extendedUserInfo){
        return (
            <form>
                <div className="image-title-container">
                    <img src={extendedUserInfo.avatarUrl} alt={extendedUserInfo.name} className="rounded-circle" width="110"></img>


                    {isNameEditing ? 
                    <div className="edit-property-dialog">
                        <input 
                        className="form-control" 
                        placeholder={extendedUserInfo.name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                        autoFocus/>
                        <IconButton size="small" title="Save" onClick={() => {
                            updateUser({name});
                            extendedUserInfo.name = name;
                        }} color="primary"><Done/></IconButton>
                        <IconButton size="small" title="Cancel" onClick={() => setIsNameEditing(false)} color="secondary"><HighlightOff/></IconButton>
                    </div> :
                    <h2>{extendedUserInfo.name}</h2>}


                    {isNameEditing ? <div/> : <EditTwoTone title="Edit name" className="edit-icon" onClick={() => setIsNameEditing(true)}></EditTwoTone>}
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
                        {isAddressEditing ? <div/> : <EditTwoTone title="Edit address" className="edit-icon" onClick={() => setIsAddressEditing(true)}></EditTwoTone>}
                    </div>

                    {isAddressEditing ? 
                    <div className="edit-property-dialog">
                        <input 
                        className="form-control" 
                        placeholder={extendedUserInfo.address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required
                        autoFocus/>
                        <IconButton size="small" title="Save" onClick={() => {
                            updateUser({address});
                            extendedUserInfo.address = address;
                        }}><Done color="primary"/></IconButton>
                        <IconButton size="small" title="Cancel" onClick={() => setIsAddressEditing(false)} color="secondary"><HighlightOff/></IconButton>
                    </div> :
                    <div className="user-property-value">{extendedUserInfo.address}</div>}
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