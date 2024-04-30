import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Suas configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA1Ljoww-P4dxEowNJL_6tBL5Cv7Pf4jso",
    authDomain: "grocify-7350e.firebaseapp.com",
    projectId: "grocify-7350e",
    storageBucket: "grocify-7350e.appspot.com",
    messagingSenderId: "514407205567",
    appId: "1:514407205567:web:647190acc13dc92fe0140a",
    measurementId: "G-M1PSJ32NLE"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {auth, app};