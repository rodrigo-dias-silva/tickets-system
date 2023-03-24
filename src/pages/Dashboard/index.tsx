import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { auth } from '../../services/firebaseConnection';

type Props = {}

export default function Dashboard({ }: Props) {
  const { logOut } = useContext(AuthContext)

  async function handleLogout() {
    await logOut(auth);
  }

  return (
    <div>
      <h1>Pagina Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}