import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
    apiKey: "AIzaSyCN_wFdNFRIlkRQeqZefCQIb2IEInLm_JE",
authDomain: "royal-academy-lms-ad2be.firebaseapp.com",
projectId: "royal-academy-lms-ad2be",
storageBucket: "royal-academy-lms-ad2be.appspot.com",
messagingSenderId: "273004716703",
appId: "1:273004716703:web:17cb8cf9ef76f7dc8a78aa"
});

const storage = getStorage(app)

export { storage };

// apiKey: "AIzaSyCN_wFdNFRIlkRQeqZefCQIb2IEInLm_JE",
// authDomain: "royal-academy-lms-ad2be.firebaseapp.com",
// projectId: "royal-academy-lms-ad2be",
// storageBucket: "royal-academy-lms-ad2be.appspot.com",
// messagingSenderId: "273004716703",
// appId: "1:273004716703:web:17cb8cf9ef76f7dc8a78aa"