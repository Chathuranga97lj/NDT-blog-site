const app = firebase.app()

const cred = app._delegate._options;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

export const _app = initializeApp(cred)  //export
//console.log(_app); 

const auth = getAuth()

const login = document.getElementById('login-form');
const signup = document.getElementById('signup-form');

// #######################################################
if (login){
    login.onsubmit = e => {
        e.preventDefault()
        document.getElementById('signin-status').innerText = "";
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                document.getElementById('id01').style.display = 'none';
            })
            .catch(err => {
                document.getElementById('signin-status').innerText = err.code;
            })
    }
}

// ##############################################################
if(signup) {
    signup.onsubmit = e => {
        e.preventDefault()
        document.getElementById('signup-status').innerText = "";
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(cred => {
                document.getElementById('id01').style.display = 'none';
            })
            .catch(err => {
                document.getElementById('signup-status').innerText = err.code;
            })
    }
}

// ################################################################
onAuthStateChanged(auth, user => {
    if(user){
        console.log('====================================');
        console.log(user.uid);
        console.log('====================================');
    }
    else{
        console.log('====================================');
        console.log('user not found');
        console.log('====================================');
    }
})

// #####################################################################
const signout_btn = document.getElementById('signout')

if(signout_btn){
    signOut(auth)
    console.log("Log out");
}