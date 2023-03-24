import React, { createContext, useEffect, useState } from "react";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

import { auth, db } from '../services/firebaseConnection'

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  signed: boolean;
  user: DataProps | null;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  logOut: (auth: Auth) => void,
  loadingAuth: boolean;
  loading: boolean;
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
  logOut: () => { },
  loadingAuth: false,
  loading: true
})

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DataProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('@ticketsUser')

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  async function signIn(email: string, password: string) {
    setLoadingAuth(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid

        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)

        let data: DataProps = {
          uid: uid,
          name: docSnap.data()?.name || '',
          email: value.user.email,
          avatarUrl: docSnap.data()?.avatarUrl || ''
        }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        toast.success('Bem-vindo(a) de volta!')
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error(error);
        setLoadingAuth(false)
        toast.error('Ops... Algo deu errado!')
      })
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
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Seja bem-vindo ao sistema!')
            navigate('/dashboard')
          })
      })
      .catch((error) => {
        console.error(error);
        setLoadingAuth(false)
      })
  }

  function storageUser(data: DataProps) {
    localStorage.setItem('@ticketsUser', JSON.stringify(data))
  }

  async function logOut(auth: Auth) {
    await signOut(auth)
    localStorage.removeItem('@ticketsUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logOut,
        loadingAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;