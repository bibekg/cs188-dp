import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAPigSypdfSb6r4AX9SkNoEXjDZEz7-zV8',
  authDomain: 'memoricle-1541754630896.firebaseapp.com',
  databaseURL: 'https://memoricle-1541754630896.firebaseio.com',
  projectId: 'memoricle-1541754630896',
  storageBucket: 'memoricle-1541754630896.appspot.com',
  messagingSenderId: '123773528711'
}
firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const fireDb = firebase.firestore()

// Disable deprecated features
fireDb.settings({ timestampsInSnapshots: true })
