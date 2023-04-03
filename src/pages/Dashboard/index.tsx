import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../contexts/auth'

import { auth, db } from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { House, MagnifyingGlass, Pencil, Plus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { DocumentData, QuerySnapshot, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';

interface queryTicketProps {
  created: string,
  createdFormat: string,
  client: string,
  clientId: string,
  topic: string,
  complement: string | null,
  status: string,
  id: string,
}

const listRef = collection(db, 'tickets')

export default function Dashboard() {
  const { logOut } = useContext(AuthContext)

  const [tickets, setTickets] = useState<queryTicketProps[]>([])
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    async function loadTickets() {
      const queryList = query(listRef, orderBy('created', 'desc'), limit(10))

      const querySnapshot = await getDocs(queryList)
      setTickets([])
      await updateState(querySnapshot)

      setLoading(false)
    }

    loadTickets()

    return () => { }
  }, [])

  async function updateState(querySnapshot: QuerySnapshot<DocumentData>) {
    const isCollectionEmpty = querySnapshot.size === 0

    if (!isCollectionEmpty) {
      let lista: queryTicketProps[] = []

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          client: doc.data().client,
          clientId: doc.data().clientId,
          complement: doc.data().complement,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          topic: doc.data().topic
        })
      })

      setTickets(tickets => [...tickets, ...lista])
    } else {
      setEmpty(true)
    }
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className='md:ml-52 px-4 py-1'>
          <Title name='Chamados'>
            <House size={24} />
          </Title>

          <div className="flex flex-col w-full justify-center items-center my-4 rounded-md bg-light-color p-10 gap-3 shadow-md max-sm:justify-center">
            <span className='my-8 text-base font-semibold'>Buscando chamados...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className='md:ml-52 px-4 py-1'>
        <Title name='Chamados'>
          <House size={24} />
        </Title>

        <>

          {
            tickets.length === 0 ? (
              <div className="flex flex-col w-full justify-center items-center my-4 rounded-md bg-light-color p-10 gap-3 shadow-md max-sm:justify-center">
                <span className='my-8 text-xl font-semibold'>Nenhum chamado encontrado...</span>
                <Link
                  to='/newTicket'
                  className='flex gap-2 items-center justify-center mb-6 h-10 w-44 rounded p-3 text-light-bg font-semibold bg-green-500 hover:opacity-90 transition-all ease-in-out duration-400 shadow-md hover:shadow-lg hover:scale-105'
                >
                  <Plus size={20} />
                  Criar chamado
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to='/newTicket'
                  className='flex float-right gap-2 items-center justify-center mb-6 h-10 w-44 rounded p-3 text-light-bg font-semibold bg-green-500 hover:opacity-90 transition-all ease-in-out duration-400 shadow-md hover:shadow-lg hover:scale-105'
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
                    {
                      tickets.map((item, index) => {
                        return (
                          <tr key={index} className="bg-gray-50 border-b border-gray-300 p-1 max-sm:block shadow-md">
                            <td
                              data-label="Cliente"
                              className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase"
                            >
                              {item.client}
                            </td>
                            <td
                              data-label="Assunto"
                              className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase"
                            >
                              {item.topic}
                            </td>
                            <td
                              data-label="Status"
                              className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase"
                            >
                              <span
                                className="bg-slate-400 py-1 px-2 rounded text-white text-xs"
                                title={'Em aberto'}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td
                              data-label="Cadastrado em"
                              className="p-2 text-center max-sm:block max-sm:border-b-2 max-sm:border-gray-100 max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase"
                            >
                              {item.createdFormat}
                            </td>
                            <td
                              data-label="#"
                              className="p-2 flex gap-1 justify-center max-sm:block  max-sm:text-xs max-sm:text-right max-sm:before:content-before-table max-sm:before:float-left max-sm:before:font-semibold max-sm:before:uppercase"
                            >
                              <button className="bg-blue-500 p-1 rounded inline-block max-sm:mr-1" title='Buscar'>
                                <MagnifyingGlass size={16} color='#fff' />
                              </button>
                              <button className="bg-orange-500 p-1 rounded inline-block" title='Editar'>
                                <Pencil size={16} color='#fff' />
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table>
              </>
            )
          }

        </>
      </div>
    </div>
  )
}