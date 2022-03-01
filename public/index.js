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
        
        document.querySelectorAll('a[title=auth]').forEach(node => {
            console.log(node);
            node.style.display = 'block'
        })
        

        document.querySelectorAll('a[title=authdone]').forEach(node => {
            console.log(node);
            node.style.display = 'none'
        })

        localStorage.setItem('uid', user.uid);
        document.getElementById('panel').innerText = user.email;
    }
    else{
        document.querySelectorAll('a[title=auth]').forEach(node => {
            console.log(node);
            node.style.display = 'none'
        })

        document.querySelectorAll('a[title=authdone]').forEach(node => {
            console.log(node);
            node.style.display = 'block'
        })
    }
})

// #####################################################################
const signout_btn = document.getElementById('signout')

if(signout_btn){
    
    signout_btn.onclick = e => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
            })
    }
}