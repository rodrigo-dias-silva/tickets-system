import React, { createContext, useState } from "react";

import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  signed: boolean;
  user: DataProps | null;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  loadingAuth: boolean;
}

interface DataProps {
  uid: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  signed: false,
  user: null,
  signIn: () => { },
  signUp: () => { },
  loadingAuth: false
})

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DataProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  function signIn(email: string, password: string) {
  }

  async function signUp(name: string, email: string, password: string) {
    setLoadingAuth(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid

        await setDoc(doc(db, 'users', uid), {
          name: name,
          avatarUrl: null
        })
          .then(() => {
            let data: DataProps = {
              uid: uid,
              name: name,
              email: value.user.email,
              avatarUrl: null
            }
            setUser(data)
            setLoadingAuth(false)
          })
      })
      .catch((error) => {
        console.error(error);
        setLoadingAuth(false)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;