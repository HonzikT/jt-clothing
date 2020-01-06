import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDCn4Pi5YKcfNwi9KcwXEXVWZtlTPSYTyE",
  authDomain: "jt-clothing-db.firebaseapp.com",
  databaseURL: "https://jt-clothing-db.firebaseio.com",
  projectId: "jt-clothing-db",
  storageBucket: "jt-clothing-db.appspot.com",
  messagingSenderId: "387125928177",
  appId: "1:387125928177:web:0c9dd483a73b9a2d144950",
  measurementId: "G-DTY4NWSKMW"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
