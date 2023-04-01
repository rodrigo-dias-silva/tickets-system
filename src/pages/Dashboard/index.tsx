import { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'

import { auth } from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { House, MagnifyingGlass, Pencil, Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

type Props = {}

export default function Dashboard({ }: Props) {
  const { logOut } = useContext(AuthContext)

  async function handleLogout() {
    await logOut(auth);
  }

  return (
    <div>
      <Header />
      <div className='md:ml-52 px-4 py-1'>
        <Title name='Chamados'>
          <House size={24} />
        </Title>

        <>
          <Link
            to='/newTicket'
            className='flex float-right gap-2 items-center justify-center mb-6 h-10 rounded p-3 text-light-bg font-semibold bg-green-500 hover:opacity-90 transition-all ease-in-out duration-400 shadow-md hover:shadow-lg hover:scale-105'
          >
            <Plus size={20} />
            Criar chamado
          </Link>

          <table className="border border-gray-300 w-full table-fixed border-collapse max-sm:border-none">
            <thead className='max-sm:hidden'>
              <tr className="bg-gray-100 border border-gray-300 p-1">
                <th scope="col" className="p-2 text-center uppercase font-bold text-sm text-gray-700">Cliente</th>
                <th scope="col" className="p-2 text-center uppercase font-bold text-sm text-gray-700">Assunto</th>
                <th scope="col" className="p-2 text-center uppercase font-bold text-sm text-gray-700">Status</th>
                <th scope="col" className="p-2 text-center uppercase font-bold text-sm text-gray-700">Cadastrado em</th>
                <th scope="col" className="p-2 text-center uppercase font-bold text-sm text-gray-700">#</th>
              </tr>
            </thead>
            <tbody className='max-sm:flex max-sm:flex-col max-sm:gap-3'>
              <tr className="bg-gray-50 border-b border-gray-300 p-1 max-sm:block shadow-md">
                <td data-label="Cliente" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">Mercado Silva</td>
                <td data-label="Assunto" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">Suporte</td>
                <td data-label="Status" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">
                  <span className="bg-slate-400 py-1 px-2 rounded text-white text-xs" title={'Em aberto'}>
                    Em aberto
                  </span>
                </td>
                <td data-label="Cadastrado em" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">01/04/2023</td>
                <td data-label="#" className="p-2 flex gap-1 justify-center max-sm:block  max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">
                  <button className="bg-blue-500 p-1 rounded inline-block max-sm:mr-1" title='Buscar'>
                    <MagnifyingGlass size={16} color='#fff' />
                  </button>
                  <button className="bg-orange-500 p-1 rounded inline-block" title='Editar'>
                    <Pencil size={16} color='#fff' />
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-300 p-1 max-sm:block shadow-md">
                <td data-label="Cliente" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">Mercado Silva</td>
                <td data-label="Assunto" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">Suporte</td>
                <td data-label="Status" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">
                  <span className="bg-slate-400 py-1 px-2 rounded text-white text-xs" title={'Em aberto'}>
                    Em aberto
                  </span>
                </td>
                <td data-label="Cadastrado em" className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">01/04/2023</td>
                <td data-label="#" className="p-2 flex gap-1 justify-center max-sm:block  max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase">
                  <button className="bg-blue-500 p-1 rounded inline-block max-sm:mr-1" title='Buscar'>
                    <MagnifyingGlass size={16} color='#fff' />
                  </button>
                  <button className="bg-orange-500 p-1 rounded inline-block" title='Editar'>
                    <Pencil size={16} color='#fff' />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </div>
  )
}