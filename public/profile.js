import { _app } from "./index.js"
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";


const profile = document.getElementById('profile');
const storage = getStorage();
const db = getFirestore();

if(localStorage.getItem("user")){
    const user = JSON.parse(localStorage.getItem("user"));
    document.querySelector("input[name=username]").placeholder = user["username"];
    document.querySelector("input[name=address]").placeholder = user["address"];
    document.querySelector("input[name=email]").placeholder = user["email"];
    document.querySelector("input[name=phone]").placeholder = user["phone"];
}

if(profile){
    profile.onsubmit = e => {
        e.preventDefault(); // refesh
        const formData = new FormData(profile);
        const data = {}
        for(let[key, value] of formData) data[key] = value;
        // data['profile']// image --> donloadURL()
        
        const fileName = `${Date.now()}-${data["profile"]["name"]}`; 
        
        const storageRef = ref(storage, fileName);

        // // 'file' comes from the Blob or File API
        uploadBytes(storageRef, data["profile"])
            .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(storageRef)
                    .then((url) => {
                        delete data['profile'];
                        data['url'] = url; 
                        const id = localStorage.getItem("uid");
                        setDoc(doc(db, "user", id), data)
                            .then(() => {
                                const user = JSON.stringify(data);
                                localStorage.setItem("user", user);
                                location.reload();
                            })
                    } )
        }
        
        );
    }
}




