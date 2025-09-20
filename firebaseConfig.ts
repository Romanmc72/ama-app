import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { localhost } from './api/base';

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY || 'placeholder',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'placeholder',
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'placeholder',
  projectId: process.env.FIREBASE_PROJECT_ID || 'placeholder',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'placeholder',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'placeholder',
  appId: process.env.FIREBASE_APP_ID || 'placeholder',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'placeholder',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
if (__DEV__) {
  connectAuthEmulator(auth, `http://${localhost || 'localhost'}:9099`);
}
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
