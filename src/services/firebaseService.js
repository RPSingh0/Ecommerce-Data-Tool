// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCR3GXQPu4jLt7yYi3UWrm9X7EDlqQP73I",
    authDomain: "ecommerce-data-rupi.firebaseapp.com",
    projectId: "ecommerce-data-rupi",
    storageBucket: "ecommerce-data-rupi.appspot.com",
    messagingSenderId: "104448358428",
    appId: "1:104448358428:web:50f14d6a0ee5f313f347d9",
    measurementId: "G-W2RLPMDP49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);