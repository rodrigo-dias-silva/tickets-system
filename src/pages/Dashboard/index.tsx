import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { auth } from '../../services/firebaseConnection';
import Header from '../../components/Header';

type Props = {}

export default function Dashboard({ }: Props) {
  const { logOut } = useContext(AuthContext)

  async function handleLogout() {
    await logOut(auth);
  }

  return (
    <div>
      <Header />
      <div className='ml-52 px-4 py-1'>
        <h1>Pagina Dashboard</h1>
        <button onClick={handleLogout}>Sair da conta</button>
      </div>
    </div>
  )
}