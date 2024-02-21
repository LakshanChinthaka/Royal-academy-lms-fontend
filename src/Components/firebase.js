import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
    apiKey: "AIzaSyCN_wFdNFRIlkRQeqZefCQIb2IEInLm_JE",
    authDomain: "royal-academy-lms-ad2be.firebaseapp.com",
    projectId: "royal-academy-lms-ad2be",
    storageBucket: "royal-academy-lms-ad2be.appspot.com",
    messagingSenderId: "273004716703",
    appId: "1:273004716703:web:17cb8cf9ef76f7dc8a78aa"
});

const storage = getStorage(app)

export { storage };
