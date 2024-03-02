import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';



const app = initializeApp({
    apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEYy,
    authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.REACT_APP_FIREBASE_APP_ID
});

const storage = getStorage(app);

export { storage };
