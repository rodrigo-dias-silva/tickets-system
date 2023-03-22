import React, { createContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  signed: boolean;
  user: any;
  signIn: (email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  signed: false,
  user: null,
  signIn: () => { }
})

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null)

  function signIn(email: string, password: string) {
    console.log(email);
    console.log(password);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;