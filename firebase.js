
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBEP4W_wna31xQHWys-WgDHcvkq4BPqcZM",
  authDomain: "myapp-6bf4d.firebaseapp.com",
  projectId: "myapp-6bf4d",
  storageBucket: "myapp-6bf4d.firebasestorage.app",
  messagingSenderId: "735119390219",
  appId: "1:735119390219:web:5a190c019bb904db28b90e",
  databaseURL:"https://console.firebase.google.com/project/myapp-6bf4d/database/myapp-6bf4d-default-rtdb/data/~2F" ,
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);