/**
 * Firebase Realtime Database Configuration
 * 
 * This file initializes Firebase once and exports the database instance.
 * Uses Firebase Web SDK v9+ modular API for tree-shaking and better performance.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLgepC1AYigwJm1GUOektdGk3GaAREuWA",
  authDomain: "test-22e10.firebaseapp.com",
  databaseURL: "https://test-22e10-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-22e10",
  storageBucket: "test-22e10.firebasestorage.app",
  messagingSenderId: "916672266585",
  appId: "1:916672266585:web:722d0670912ff8bc38cc48",
  measurementId: "G-7MC7T38QJB"
};

// Initialize Firebase only once (singleton pattern)
// This prevents multiple initializations in development with hot reloading
let app: FirebaseApp;
let db: Database;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} else {
  app = getApps()[0];
  db = getDatabase(app);
}

// Export the database instance for use throughout the app
export { db };
export default app;
