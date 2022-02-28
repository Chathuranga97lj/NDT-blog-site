import { _app } from "./index.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";

const profile = document.getElementById('profile');

if(profile){
    profile.onsubmit = e => {
        e.preventDefault(); // refesh
        const formData = new FormData(profile);
        for(let[key, value] of formData) console.log(`${key}==${value}`);
    }
}