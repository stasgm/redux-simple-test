// import { initializeApp } from 'firebase';
// tslint:disable:no-submodule-imports
import firebase from 'firebase/app';
import { config } from '@configs/firebase.config.json';

firebase.initializeApp(config);

export const firebaseDB = firebase.firestore();

firebaseDB.settings({ timestampsInSnapshots: true });
