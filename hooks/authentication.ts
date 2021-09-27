import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../models/User'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const userState = atom<User>({
  key: 'user',
  default: null,
})

// firebaseの認証処理
async function createUserIfNotFound(user: User) {
  const db = getFirestore()
  const usersCollection = collection(db, 'users')
  const userRef = doc(usersCollection, user.uid)
  const document = await getDoc(userRef)
  if (document.exists()) {
    return
  }

  await setDoc(userRef, {
    name: new Date().getTime(),
  })
}

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    const auth = getAuth()

    console.log('Start useEffect')
    signInAnonymously(auth).catch(function (error) {
      console.error(error)
    })


    onAuthStateChanged(auth, function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: '',
        }
        setUser(loginUser)
        createUserIfNotFound(loginUser)
      } else {
        setUser(null)
      }
    })
  },[])

  return { user }
}