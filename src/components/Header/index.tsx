import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Gear, House, Users } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/auth'

import avatarImg from '../../assets/avatar.png'

type Props = {}

export default function Header({ }: Props) {
  const { user } = useContext(AuthContext)

  return (
    <div className='flex md:block bg-dark-blue md:fixed relative md:h-full h-auto overflow-auto md:w-52 w-full'>
      <div className='bg-profile bg-dark-bg bg-center bg-no-repeat bg-cover h-40 pt-8 md:flex hidden'>
        <img
          src={user?.avatarUrl ? user.avatarUrl : avatarImg}
          alt="foto usuario"
          className='w-24 h-24 block m-auto rounded-full object-cover drop-shadow-md '
        />
      </div>
      <Link to='/dashboard' className='group flex max-md:justify-center w-full float-left p-4 text-light-bg items-center transition gap-2 hover:bg-dark-bg hover:text-white'>
        <House size={24} />
        <span className='text-slate-400 group-hover:text-white'>Chamados</span>
      </Link>
      <Link to='/customers' className='group flex max-md:justify-center w-full float-left p-4 text-light-bg items-center transition gap-2 hover:bg-dark-bg hover:text-white'>
        <Users size={24} />
        <span className='text-slate-400 group-hover:text-white'>Clientes</span>
      </Link>
      <Link to='/profile' className='group flex max-md:justify-center w-full float-left p-4 text-light-bg items-center transition gap-2 hover:bg-dark-bg hover:text-white'>
        <Gear size={24} />
        <span className='text-slate-400 group-hover:text-white'>Configurações</span>
      </Link>
    </div>
  )
}