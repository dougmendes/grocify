import { initializeApp } from 'firebase/app';
import { auth, firebaseConfig, signInWithEmailAndPassword} from '../firebase/firebase';

Cypress.Commands.add('initializeFirebase', () => {
    initializeApp(firebaseConfig);
});

Cypress.Commands.add('login', (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
});