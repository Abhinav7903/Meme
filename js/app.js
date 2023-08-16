import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInAnonymously,EmailAuthProvider,onAuthStateChanged,linkWithCredential ,signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage ,deleteObject , ref, uploadBytes, getDownloadURL,getMetadata,listAll  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {getDatabase, ref as dbRef, push ,get,onValue,remove,child} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-check.js"
import { config } from './config.js';
const firebaseConfig = {
    apiKey:config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket:config.storageBucket,
    messagingSenderId: "229841694919",
    databaseURL: config.databaseURL ,
    appId: config.appId,
    measurementId: "G-618J9NRM8H"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const storage=getStorage(app);
  const database=getDatabase(app);


 

  export {auth,signInAnonymously,EmailAuthProvider,onAuthStateChanged,linkWithCredential,signOut,child,storage, ref,listAll, uploadBytes, getDownloadURL,database,dbRef,push,get ,onValue,deleteObject,remove,getMetadata  };