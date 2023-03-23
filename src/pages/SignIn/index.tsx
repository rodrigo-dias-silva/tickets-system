import { useState, useContext, FormEvent } from 'react'

import { ClockClockwise, Eye, EyeClosed } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/Logo_maior.png'

export default function SignIn() {
  const [typePssword, setTypePssword] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (email !== '' && password !== '') {
      await signIn(email, password)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center bg-dark-bg px-3' >
      <div className='bg-light-bg w-[600px] flex justify-center items-center flex-col'>
        <div className='bg-dark-blue w-full flex justify-center'>
          <img src={logo} alt="logo do sistema de chamados" className='w-44 h-36 p-5' />
        </div>

        <form
          className='mt-6 w-11/12 flex flex-col gap-4'
          onSubmit={handleSignIn}
        >
          <h1 className='text-center text-dark-blue text-2xl font-bold'>Entrar</h1>
          <div className='w-full'>
            <input
              type="email"
              placeholder='Digite seu e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full h-10 rounded p-3 text-sm'
            />
          </div>
          <div className='relative w-full'>
            <input
              type={typePssword ? 'password' : 'text'}
              placeholder='Digite sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full h-10 rounded p-3 text-sm'
            />
            <button
              type='button'
              onClick={() => setTypePssword(!typePssword)}
              className='absolute right-3 h-10'
            >
              {typePssword ?
                (<Eye size={24} />)
                :
                (<EyeClosed size={24} />)
              }
            </button>
          </div>
          <button
            type="submit"
            className={`w-full h-10 rounded p-3 text-lg text-light-bg bg-dark-blue flex items-center justify-center font-bold ${loadingAuth && 'opacity-80 cursor-not-allowed'}`}
          >
            {
              loadingAuth ?
                <ClockClockwise size={25} color='#fff' weight='thin' />
                :
                'Acessar'
            }
          </button>
        </form>

        <Link to={'/register'} className='my-6 text-sm'>Criar uma conta</Link>
      </div>
    </div>
  )
}