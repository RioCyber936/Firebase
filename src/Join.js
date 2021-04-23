import React, {useState, useContext} from "react";
import {AuthContext} from "./index";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const googleProvider = new firebase.auth.GoogleAuthProvider()
const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");
    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(res => {
            if(res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
            setErrors(e.message);
        });
    }
    const handleFormJoinGoogle = () =>  {
        firebase
        .auth()
        .signInWithPopup(googleProvider).then((res) => {
            if(res.user) Auth.setLoggedIn(true);
          }).catch((error) => {
            console.log(error.message)
          })
    }
    return (
<div>
            <h1>Join</h1>
            <form onSubmit={e => handleForm(e)}>
                <input value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="email"></input>
                <input value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="password">
                </input>
                <hr></hr>
                <button class="googleBtn" type="button" onClick={handleFormJoinGoogle}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="logo"></img>
                    Join with Google
                </button>
                <button type="submit">Join</button>
                <span>{error}</span>
            </form>
        </div>
    );
}
export default Join;