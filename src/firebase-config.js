import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCiTRQqIDwnxbN2lyBhKMD-8zXdduJ53f8',
  authDomain: 'learning-firebase-d3d8c.firebaseapp.com',
  projectId: 'learning-firebase-d3d8c',
  storageBucket: 'learning-firebase-d3d8c.appspot.com',
  messagingSenderId: '476158950936',
  appId: '1:476158950936:web:dd0457ae2f458092b7cd6d',
  measurementId: 'G-B97C7SZ2GE',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
