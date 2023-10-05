// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_KEY,
	authDomain: "moviedb-avatars-storage.firebaseapp.com",
	projectId: "moviedb-avatars-storage",
	storageBucket: "moviedb-avatars-storage.appspot.com",
	messagingSenderId: "216154156205",
	appId: "1:216154156205:web:6f291770c18b431a546a24",
	measurementId: "G-3LS098VSFQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
