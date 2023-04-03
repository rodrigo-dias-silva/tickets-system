import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"

import { PlusCircle } from "@phosphor-icons/react"

import Header from "../../components/Header"
import Title from "../../components/Title"

import { AuthContext } from "../../contexts/auth"

import { addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { toast } from "react-toastify"

interface CustomersProps {
  id: string,
  company: string
}

const listRef = collection(db, 'customers')

export default function New() {

  const { user } = useContext(AuthContext)

  const [customers, setCustomers] = useState<CustomersProps[]>([])
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customerSelected, setCustomerSelected] = useState(0)

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')

  useEffect(() => {
    async function loadCustomers() {
      const querySnap = await getDocs(listRef)
        .then((snapshot) => {
          let lista: CustomersProps[] = []

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              company: doc.data().company
            })
          })

          if (snapshot.docs.length === 0) {
            console.log('Nenhuma empresa encontrada');
            setCustomers([{ id: '1', company: 'FREELANCE' }])
            setLoadCustomer(false)
            return
          }

          setCustomers(lista)
          setLoadCustomer(false)

        })
        .catch((error) => {
          console.error('Erro ao buscar os clientes', error);
          setLoadCustomer(false)
          setCustomers([{ id: '1', company: 'FREELANCE' }])
        })
    }

    loadCustomers()
  }, [])

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value)
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setAssunto(e.target.value)
  }

  function handleCustomerChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(e.target.value)
    setCustomerSelected(value)
    console.log(customers[value].company);
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await addDoc(collection(db, 'tickets'), {
      created: new Date(),
      client: customers[customerSelected].company,
      clientId: customers[customerSelected].id,
      topic: assunto,
      complement: complemento,
      status: status,
      userId: user && user.uid
    })
      .then(() => {
        toast.success('Chamado registrado!')
        setComplemento('')
        setCustomerSelected(0)
      })
      .catch((error) => {
        toast.error('Opss... Erro ao registrar, tente mais tarde.')
        console.error(error);
      })
  }

  return (
    <div>
      <Header />
      <div className='md:ml-52 px-4 py-1'>
        <Title name="Novo chamado">
          <PlusCircle size={24} />
        </Title>

        <div className='flex bg-light-color rounded-md p-4 items-center mb-4 shadow-md'>
          <form className='flex flex-col gap-3 w-full' onSubmit={handleRegister}>
            <label className="font-semibold">Clientes</label>
            {
              loadCustomer ? (
                <input type="text" disabled value='Carregando' />
              ) : (
                <select
                  className='w-full h-11 rounded p-3 text-sm max-w-xl outline-none mb-4'
                  value={customerSelected}
                  onChange={handleCustomerChange}
                >
                  {
                    customers.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item.company}
                        </option>
                      )
                    })
                  }
                </select>
              )
            }

            <label className="font-semibold">Assunto</label>
            <select
              className='w-full h-11 rounded p-3 text-sm max-w-xl outline-none mb-4'
              value={assunto}
              onChange={handleSelectChange}
            >
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label className="font-semibold">Status</label>
            <div className="mb-4 flex">

              <input
                id="aberto"
                type="radio"
                name="radio"
                value="Aberto"
                checked={status === 'Aberto'}
                onChange={handleOptionChange}
                className="peer/aberto"
              />
              <label htmlFor="aberto" className='mr-4 pl-2 text-sm hover:cursor-pointer peer-checked/aberto:text-sky-500'>Aberto</label>

              <input
                id="progresso"
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === 'Progresso'}
                className="peer/progresso"
              />
              <label htmlFor="progresso" className='mr-4 pl-2 text-sm hover:cursor-pointer peer-checked/progresso:text-sky-500'>Em progresso</label>

              <input
                id="concluido"
                type="radio"
                name="radio"
                value="Concluido"
                onChange={handleOptionChange}
                checked={status === 'Concluido'}
                className="peer/concluido"
              />
              <label htmlFor="concluido" className='pl-2 text-sm hover:cursor-pointer peer-checked/concluido:text-sky-500'>Concluído</label>
            </div>

            <label className="font-semibold">Complemento</label>
            <textarea
              typeof="text"
              placeholder="Descreva seu problema/pedido (opcional)."
              className="resize-none h-24 p-3 rounded"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button
              type="submit"
              className='w-36 h-10 rounded p-3 text-lg text-light-bg bg-dark-blue flex items-center justify-center font-semibold hover:opacity-80 transition-all shadow-md hover:shadow-none'
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}