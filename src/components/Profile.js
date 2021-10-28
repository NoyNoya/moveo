import React,{ useEffect, useState, Component } from "react";
import { signInWithEmailAndPassword, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";

export default function Profile() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
    //   if (loading) {
    //     // maybe trigger a loading screen
    //     return;
    //   }
      if (!user) {
          history.replace("/login");
      }
    }, [user, loading]);

    return (
        <div>Hi all</div>
    );
}