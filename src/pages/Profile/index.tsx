import { useContext, useState } from 'react'
import { Gear, UploadSimple } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/auth'

import avatar from '../../assets/avatar.png'

import Header from '../../components/Header'
import Title from '../../components/Title'

type Props = {}

export default function Profile({ }: Props) {

  const { user } = useContext(AuthContext)

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

  return (
    <div>
      <Header />
      <div className='md:ml-52 px-4 py-1'>
        <Title name='Configurações'>
          <Gear size={24} />
        </Title>

        <div className='flex bg-light-color rounded-md p-4 items-center mb-4 shadow-md'>
          <form className='w-full'>
            <div className='group w-72 h-72 flex justify-center items-center flex-col cursor-pointer'>
              <span className='z-10 absolute opacity-60 transition-all group-hover:opacity-100 group-hover:scale-125 group-hover:drop-shadow-md'>
                <UploadSimple size={30} color='#fff' />
              </span>
              <input type="file" accept='image/*' className='hidden' />
              <img src={avatarUrl ? avatarUrl : avatar} alt='foto de perfil' className='w-64 h-64 rounded-full object-cover mb-4' />
            </div>
            <div className='flex flex-col gap-3 w-full'>
              <span className=''>Nome</span>
              <input
                type="text"
                placeholder='Seu nome'
                className='w-full h-10 rounded p-3 text-sm max-w-xl outline-none mb-4'
              />
            </div>

            <div className='flex flex-col gap-3 w-full'>
              <span className=''>E-mail</span>
              <input
                type="text"
                placeholder='teste@teste.com'
                disabled
                className='cursor-not-allowed w-full max-w-xl h-10 rounded p-3 text-sm mb-4'
              />
            </div>

            <button
              type='submit'
              className='w-36 h-10 rounded p-3 text-lg text-light-bg bg-dark-blue flex items-center justify-center font-semibold hover:opacity-80 transition-all shadow-md hover:shadow-none'
            >
              Salvar
            </button>
          </form>
        </div>

        <div className='flex bg-light-color rounded-md p-4 items-center mb-4 shadow-md'>
          <button className='w-36 h-10 rounded p-3 text-lg text-dark-blue bg-transparent border border-dark-blue flex items-center justify-center font-semibold hover:bg-dark-blue hover:text-light-color transition-all shadow-md hover:shadow-none'>Sair</button>
        </div>
      </div>
    </div>
  )
}