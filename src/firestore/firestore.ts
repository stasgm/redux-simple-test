import { initializeApp } from 'firebase';
import { config } from '@configs/firebase.config.json';

export const firebaseDB = initializeApp(config);
